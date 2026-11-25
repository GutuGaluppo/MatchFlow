import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { URL } from "node:url";
import { buildCandidate, JOB } from "./matching.ts";
import { DATA_FILE, readCandidates, SEED_FILE, updateCandidateStatus } from "./store.ts";
import { CANDIDATE_STATUSES, type Candidate, type CandidateRecord, type CandidateStatus } from "./types.ts";

export type AppOptions = { dataFile?: string; seedFile?: string };
const VALID_SORTS = ["matchScore", "name", "experienceYears", "updatedAt"] as const;
type SortBy = (typeof VALID_SORTS)[number];

class RequestError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function send(res: ServerResponse, status: number, value: unknown): void {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(value));
}
function fail(res: ServerResponse, status: number, code: string, message: string): void {
  send(res, status, { error: { code, message } });
}
function numberParam(value: string | null, fallback: number, min: number, max: number, name: string): number {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) throw new RequestError(400, "INVALID_QUERY", `${name} must be an integer between ${min} and ${max}.`);
  const result = Number(value);
  if (!Number.isSafeInteger(result) || result < min || result > max) {
    throw new RequestError(400, "INVALID_QUERY", `${name} must be an integer between ${min} and ${max}.`);
  }
  return result;
}
async function readBody(req: IncomingMessage): Promise<unknown> {
  if (req.headers["content-type"]?.split(";")[0]?.trim().toLowerCase() !== "application/json") {
    throw new RequestError(415, "INVALID_CONTENT_TYPE", "Content-Type must be application/json.");
  }
  let body = "";
  for await (const chunk of req) {
    body += chunk.toString("utf8");
    if (body.length > 32_768) throw new RequestError(413, "PAYLOAD_TOO_LARGE", "Max request body is 32 KB.");
  }
  try { return JSON.parse(body); }
  catch { throw new RequestError(400, "INVALID_JSON", "Body must contain valid JSON."); }
}
function candidatesResponse(records: CandidateRecord[], url: URL) {
  const params = url.searchParams;
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const status = params.get("status");
  const role = (params.get("role") ?? "").trim().toLowerCase();
  const skillValues = (params.get("skills") ?? "").split(",").map(skill => skill.trim().toLowerCase()).filter(Boolean);
  const skillMode = params.get("skillMode") ?? "all";
  const page = numberParam(params.get("page"), 1, 1, 10_000, "page");
  const limit = numberParam(params.get("limit"), 12, 1, 100, "limit");
  const minScore = numberParam(params.get("minScore"), 0, 0, 100, "minScore");
  const maxScore = numberParam(params.get("maxScore"), 100, 0, 100, "maxScore");
  const sortBy = params.get("sortBy") ?? "matchScore";
  const order = params.get("order") ?? (sortBy === "name" ? "asc" : "desc");
  if (status && !CANDIDATE_STATUSES.includes(status as CandidateStatus)) throw new RequestError(400, "INVALID_QUERY", "Invalid status.");
  if (skillMode !== "all" && skillMode !== "any") throw new RequestError(400, "INVALID_QUERY", "skillMode must be all or any.");
  if (!VALID_SORTS.includes(sortBy as SortBy)) throw new RequestError(400, "INVALID_QUERY", "Invalid sortBy value.");
  if (order !== "asc" && order !== "desc") throw new RequestError(400, "INVALID_QUERY", "order must be asc or desc.");
  if (minScore > maxScore) throw new RequestError(400, "INVALID_QUERY", "minScore cannot exceed maxScore.");

  const statusCounts = Object.fromEntries(CANDIDATE_STATUSES.map(item => [item, records.filter(candidate => candidate.status === item).length])) as Record<CandidateStatus, number>;
  const items = records.map(record => buildCandidate(record)).filter(candidate => {
    const visible = `${candidate.name} ${candidate.role} ${candidate.headline} ${candidate.skills.join(" ")}`.toLowerCase();
    const skills = candidate.skills.map(skill => skill.toLowerCase());
    return (!q || visible.includes(q)) && (!status || candidate.status === status) &&
      (!role || candidate.role.toLowerCase().includes(role)) &&
      (!skillValues.length || (skillMode === "all" ? skillValues.every(skill => skills.includes(skill)) : skillValues.some(skill => skills.includes(skill)))) &&
      candidate.matchScore >= minScore && candidate.matchScore <= maxScore;
  });
  items.sort((a: Candidate, b: Candidate) => {
    let compare = 0;
    if (sortBy === "name") compare = a.name.localeCompare(b.name);
    else if (sortBy === "updatedAt") compare = a.updatedAt.localeCompare(b.updatedAt);
    else compare = a[sortBy as "matchScore" | "experienceYears"] - b[sortBy as "matchScore" | "experienceYears"];
    return (order === "asc" ? compare : -compare) || a.id.localeCompare(b.id);
  });
  const total = items.length;
  const data = items.slice((page - 1) * limit, page * limit).map(({ match, ...summary }) => summary);
  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit), statusCounts } };
}

async function handleRequest(req: IncomingMessage, res: ServerResponse, opts: Required<AppOptions>): Promise<void> {
  // Wide-open CORS is intentional for a LOCAL MOCK API, never for production with real applicants.
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "GET, PATCH, POST, OPTIONS");
  res.setHeader("access-control-allow-headers", "Content-Type, X-Mock-Fail");
  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  // Dev-only switches to exercise loading/error/optimistic rollback in TanStack Query.
  const delay = numberParam(url.searchParams.get("delayMs"), 0, 0, 2_000, "delayMs");
  if (delay) await new Promise(resolve => setTimeout(resolve, delay));
  if (url.searchParams.get("simulateError") === "1" || req.headers["x-mock-fail"] === "1") {
    fail(res, 503, "SIMULATED_FAILURE", "Deliberate test failure. No data was changed.");
    return;
  }
  if (req.method === "GET" && pathname === "/api/health") {
    send(res, 200, { status: "ok", service: "MatchFlow Candidates API", version: "1.0.0" }); return;
  }
  if (req.method === "GET" && pathname === "/api/jobs") {
    send(res, 200, { data: [JOB] }); return;
  }
  if (req.method === "GET" && pathname === `/api/jobs/${JOB.id}`) {
    send(res, 200, { data: JOB }); return;
  }
  if (req.method === "GET" && pathname === "/api/filters") {
    const records = readCandidates(opts.dataFile, opts.seedFile);
    send(res, 200, { data: {
      statuses: CANDIDATE_STATUSES,
      roles: [...new Set(records.map(candidate => candidate.role))].sort(),
      skills: [...new Set(records.flatMap(candidate => candidate.skills))].sort(),
      workModels: ["remote", "hybrid", "onsite"]
    } }); return;
  }
  if (req.method === "GET" && pathname === "/api/candidates") {
    send(res, 200, candidatesResponse(readCandidates(opts.dataFile, opts.seedFile), url)); return;
  }
  const detail = pathname.match(/^\/api\/candidates\/([a-zA-Z0-9-]+)$/);
  const statusUpdate = pathname.match(/^\/api\/candidates\/([a-zA-Z0-9-]+)\/status$/);
  const shortlist = pathname.match(/^\/api\/candidates\/([a-zA-Z0-9-]+)\/shortlist$/);
  if (req.method === "GET" && detail) {
    const record = readCandidates(opts.dataFile, opts.seedFile).find(candidate => candidate.id === detail[1]);
    if (!record) { fail(res, 404, "NOT_FOUND", "Candidate not found."); return; }
    send(res, 200, { data: buildCandidate(record) }); return;
  }
  if (req.method === "PATCH" && statusUpdate) {
    const body = await readBody(req);
    if (!body || typeof body !== "object" || Array.isArray(body) || !("status" in body) ||
        typeof body.status !== "string" || !CANDIDATE_STATUSES.includes(body.status as CandidateStatus)) {
      throw new RequestError(400, "INVALID_STATUS", `Valid statuses: ${CANDIDATE_STATUSES.join(", ")}.`);
    }
    const record = updateCandidateStatus(statusUpdate[1], body.status as CandidateStatus, opts.dataFile, opts.seedFile);
    if (!record) { fail(res, 404, "NOT_FOUND", "Candidate not found."); return; }
    send(res, 200, { data: buildCandidate(record) }); return;
  }
  if (req.method === "POST" && shortlist) {
    const record = updateCandidateStatus(shortlist[1], "shortlisted", opts.dataFile, opts.seedFile);
    if (!record) { fail(res, 404, "NOT_FOUND", "Candidate not found."); return; }
    send(res, 200, { data: buildCandidate(record) }); return;
  }
  fail(res, 404, "NOT_FOUND", "Route not found.");
}

export function createApp(options: AppOptions = {}) {
  const opts = { dataFile: options.dataFile ?? DATA_FILE, seedFile: options.seedFile ?? SEED_FILE };
  return createServer((req, res) => {
    handleRequest(req, res, opts).catch(error => {
      if (res.headersSent) { res.destroy(); return; }
      if (error instanceof RequestError) fail(res, error.status, error.code, error.message);
      else { console.error(error); fail(res, 500, "INTERNAL_ERROR", "An unexpected error occurred."); }
    });
  });
}
