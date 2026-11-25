import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { CandidateRecord, CandidateStatus } from "./types.ts";
import { CANDIDATE_STATUSES } from "./types.ts";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
export const SEED_FILE = join(projectRoot, "data", "seed-candidates.json");
export const DATA_FILE = process.env.MATCHFLOW_DATA_FILE || join(projectRoot, "data", "candidates.json");

function parseRecords(contents: string): CandidateRecord[] {
  const value: unknown = JSON.parse(contents);
  if (!Array.isArray(value)) throw new Error("Candidate data must be a JSON array.");
  // The fixtures are local, but validate the fields used by filters and mutations.
  for (const item of value) {
    if (!item || typeof item !== "object" || typeof item.id !== "string" ||
        typeof item.name !== "string" || !Array.isArray(item.skills) ||
        !CANDIDATE_STATUSES.includes(item.status) || typeof item.updatedAt !== "string") {
      throw new Error("Invalid candidate data file.");
    }
  }
  return value as CandidateRecord[];
}

export function initializeStore(dataFile = DATA_FILE, seedFile = SEED_FILE): void {
  mkdirSync(dirname(dataFile), { recursive: true });
  if (!existsSync(dataFile)) writeFileSync(dataFile, readFileSync(seedFile));
}

export function readCandidates(dataFile = DATA_FILE, seedFile = SEED_FILE): CandidateRecord[] {
  initializeStore(dataFile, seedFile);
  return parseRecords(readFileSync(dataFile, "utf8"));
}

function saveRecords(records: CandidateRecord[], dataFile: string): void {
  const temporaryFile = `${dataFile}.tmp`;
  writeFileSync(temporaryFile, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  renameSync(temporaryFile, dataFile);
}

export function updateCandidateStatus(
  id: string,
  status: CandidateStatus,
  dataFile = DATA_FILE,
  seedFile = SEED_FILE
): CandidateRecord | null {
  const records = readCandidates(dataFile, seedFile);
  const record = records.find(candidate => candidate.id === id);
  if (!record) return null;
  if (record.status !== status) {
    record.status = status;
    record.updatedAt = new Date().toISOString();
    saveRecords(records, dataFile);
  }
  return record;
}

export function resetStore(dataFile = DATA_FILE, seedFile = SEED_FILE): number {
  const records = parseRecords(readFileSync(seedFile, "utf8"));
  mkdirSync(dirname(dataFile), { recursive: true });
  saveRecords(records, dataFile);
  return records.length;
}
