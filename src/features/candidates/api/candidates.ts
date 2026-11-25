/** Candidates API - handles all candidate-related data fetching and mutations */
import type {
	Candidate,
	CandidateStatus,
} from "../../../types";
import { mockCandidates } from "./mock-candidates";
import type { CandidateFilters, CandidateListResponse } from "../types";

const API_BASE_URL = "http://127.0.0.1:4000"; // Change for your environment.

async function json<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${path}`, init);
	const data = await response.json();
	if (!response.ok)
		throw new Error(
			data.error?.message ?? `Request failed (${response.status})`,
		);
	return data as T;
}

function buildMockResponse(filters: CandidateFilters = {}): CandidateListResponse {
	const candidates = mockCandidates.filter((candidate) => {
		const q = (filters.q ?? "").trim().toLowerCase();
		const visible = `${candidate.name} ${candidate.role} ${candidate.headline} ${candidate.skills.join(" ")}`.toLowerCase();
		const hasQ = !q || visible.includes(q);
		const hasStatus = !filters.status || candidate.status === filters.status;
		const hasRole = !filters.role || candidate.role.toLowerCase().includes(filters.role.toLowerCase());
		const hasSkills =
			!filters.skills?.length ||
			(filters.skillMode === "any"
				? filters.skills.some((skill) =>
						candidate.skills.map((s: string) => s.toLowerCase()).includes(skill.toLowerCase())
					)
				: filters.skills.every((skill) =>
						candidate.skills.map((s: string) => s.toLowerCase()).includes(skill.toLowerCase())
					));
		return hasQ && hasStatus && hasRole && hasSkills;
	});

	const page = filters.page ?? 1;
	const limit = filters.limit ?? 12;
	const start = (page - 1) * limit;
	const paginatedData = candidates.slice(start, start + limit);

	return {
		data: paginatedData,
		meta: {
			page,
			limit,
			total: candidates.length,
			totalPages: Math.ceil(candidates.length / limit),
			statusCounts: {
				new: candidates.filter((c) => c.status === "new").length,
				shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
				interview: candidates.filter((c) => c.status === "interview").length,
				rejected: candidates.filter((c) => c.status === "rejected").length,
			},
		},
	};
}

export const candidatesApi = {
	async list(filters: CandidateFilters = {}, options?: { signal?: AbortSignal }) {
		if (options?.signal?.aborted) {
			throw new DOMException("Aborted", "AbortError");
		}
		return buildMockResponse(filters);
	},

	updateStatus(id: string, status: CandidateStatus, simulateError = false) {
		const suffix = simulateError ? "?simulateError=1" : "";
		return json<{ data: Candidate }>(
			`/api/candidates/${encodeURIComponent(id)}/status${suffix}`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status }),
			},
		);
	},

	shortlist(id: string) {
		return json<{ data: Candidate }>(
			`/api/candidates/${encodeURIComponent(id)}/shortlist`,
			{ method: "POST" },
		);
	},
};
