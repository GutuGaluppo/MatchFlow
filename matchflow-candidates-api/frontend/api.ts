/** Copy this file into a Vite React app (adjust type imports as appropriate). */
import type {
  Candidate,
  CandidateDetailResponse,
  CandidateListResponse,
  CandidateStatus
} from "../src/types.ts";

export type CandidateFilters = {
  q?: string;
  status?: CandidateStatus;
  role?: string;
  skills?: string[];
  skillMode?: "all" | "any";
  minScore?: number;
  maxScore?: number;
  page?: number;
  limit?: number;
  sortBy?: "matchScore" | "name" | "experienceYears" | "updatedAt";
  order?: "asc" | "desc";
  delayMs?: number;
};
const API_BASE_URL = "http://127.0.0.1:4000"; // Change for your environment.

async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message ?? `Request failed (${response.status})`);
  return data as T;
}

export const candidateKeys = {
  all: ["candidates"] as const,
  lists: () => [...candidateKeys.all, "list"] as const,
  list: (filters: CandidateFilters) => [...candidateKeys.lists(), filters] as const,
  detail: (id: string) => [...candidateKeys.all, "detail", id] as const
};

export const candidatesApi = {
  list(filters: CandidateFilters = {}) {
    const params = new URLSearchParams();
    for (const [key, raw] of Object.entries(filters)) {
      if (raw === undefined || raw === null || raw === "") continue;
      params.set(key, Array.isArray(raw) ? raw.join(",") : String(raw));
    }
    return json<CandidateListResponse>(`/api/candidates?${params.toString()}`);
  },
  get(id: string) {
    return json<CandidateDetailResponse>(`/api/candidates/${encodeURIComponent(id)}`);
  },
  updateStatus(id: string, status: CandidateStatus, simulateError = false) {
    const suffix = simulateError ? "?simulateError=1" : "";
    return json<{data: Candidate}>(`/api/candidates/${encodeURIComponent(id)}/status${suffix}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status })
    });
  },
  shortlist(id: string) {
    return json<{data: Candidate}>(`/api/candidates/${encodeURIComponent(id)}/shortlist`, {method: "POST"});
  }
};
