import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApp } from "../src/server.ts";
import { JOB } from "../src/matching.ts";
import type { AddressInfo } from "node:net";

const directory = mkdtempSync(join(tmpdir(), "matchflow-api-tests-"));
const app = createApp({ dataFile: join(directory, "candidates.json") });
let baseUrl = "";
before(async () => {
  await new Promise<void>(resolve => app.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${(app.address() as AddressInfo).port}`;
});
after(async () => {
  await new Promise<void>((resolve, reject) => app.close(error => error ? reject(error) : resolve()));
  rmSync(directory, { recursive: true, force: true });
});

const get = (path: string) => fetch(`${baseUrl}${path}`);

test("health and job config are available", async () => {
  const health = await get("/api/health");
  assert.equal(health.status, 200);
  const job = await (await get(`/api/jobs/${JOB.id}`)).json();
  assert.equal(job.data.requirements.reduce((sum: number, req: {weight:number}) => sum + req.weight, 0), 100);
});

test("24 candidates and stable pagination", async () => {
  const response = await get("/api/candidates?limit=5&page=2");
  const result = await response.json();
  assert.equal(response.status, 200);
  assert.equal(result.meta.total, 24);
  assert.equal(result.meta.totalPages, 5);
  assert.equal(result.data.length, 5);
  assert.equal(result.data[0].match, undefined); // detailed matching only on detail endpoint
  assert.ok(result.data.every((candidate: {matchScore:number}) => candidate.matchScore >= 0 && candidate.matchScore <= 100));
});

test("Alex Morgan has the original 92 percent illustrative score and explanation", async () => {
  const result = await (await get("/api/candidates/cand-001")).json();
  assert.equal(result.data.name, "Alex Morgan");
  assert.equal(result.data.matchScore, 92);
  assert.ok(result.data.match.matchedRequirements.some((requirement: {skill:string}) => requirement.skill === "React"));
  assert.ok(result.data.match.missingRequirements.some((requirement: {skill:string}) => requirement.skill === "Docker"));
});

test("filters combine correctly", async () => {
  const result = await (await get("/api/candidates?status=shortlisted&skills=React,TypeScript&minScore=70&sortBy=name&order=asc")).json();
  assert.ok(result.data.length > 0);
  assert.ok(result.data.every((c: {status: string;matchScore:number}) => c.status === "shortlisted" && c.matchScore >= 70));
  const names = result.data.map((c: {name:string}) => c.name);
  assert.deepEqual(names, [...names].sort());
});

test("mutations persist to disk, and reads reflect changed status", async () => {
  const update = await fetch(`${baseUrl}/api/candidates/cand-001/status`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "interview" })
  });
  assert.equal(update.status, 200);
  assert.equal((await update.json()).data.status, "interview");
  const result = await (await get("/api/candidates/cand-001")).json();
  assert.equal(result.data.status, "interview");
  const shortlist = await fetch(`${baseUrl}/api/candidates/cand-001/shortlist`, { method: "POST" });
  assert.equal((await shortlist.json()).data.status, "shortlisted");
});

test("invalid input is rejected cleanly", async () => {
  assert.equal((await get("/api/candidates?page=zero")).status, 400);
  assert.equal((await get("/api/candidates?minScore=80&maxScore=10")).status, 400);
  assert.equal((await get("/api/candidates/cand-999")).status, 404);
  const invalid = await fetch(`${baseUrl}/api/candidates/cand-001/status`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "hired" })
  });
  assert.equal(invalid.status, 400);
});

test("simulateError permits testing frontend rollback without mutating data", async () => {
  const beforeStatus = (await (await get("/api/candidates/cand-002")).json()).data.status;
  const response = await fetch(`${baseUrl}/api/candidates/cand-002/status?simulateError=1`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "rejected" })
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error.code, "SIMULATED_FAILURE");
  assert.equal((await (await get("/api/candidates/cand-002")).json()).data.status, beforeStatus);
});

test("CORS preflight is enabled for the local UI", async () => {
  const response = await fetch(`${baseUrl}/api/candidates`, { method: "OPTIONS" });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
});
