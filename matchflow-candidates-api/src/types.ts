/** Contracts shared by the API and a future React/TypeScript frontend. */
export const CANDIDATE_STATUSES = ["new", "shortlisted", "interview", "rejected"] as const;
export type CandidateStatus = (typeof CANDIDATE_STATUSES)[number];
export type WorkModel = "remote" | "hybrid" | "onsite";
export type Availability = "immediate" | "two_weeks" | "one_month" | "negotiable";
export type Priority = "must_have" | "nice_to_have";

export type Requirement = { skill: string; weight: number; priority: Priority };
export type Job = {
  id: string;
  title: string;
  focus: string;
  requirements: Requirement[];
  disclaimer: string;
};

export type CandidateRecord = {
  id: string;
  name: string;
  role: string;
  headline: string;
  location: string;
  experienceYears: number;
  skills: string[];
  status: CandidateStatus;
  availability: Availability;
  workModel: WorkModel;
  summary: string;
  evidence: string[];
  appliedAt: string;
  updatedAt: string;
};

export type MatchDetails = {
  jobId: string;
  matchedRequirements: Requirement[];
  missingRequirements: Requirement[];
  evidence: string[];
  explanation: string;
};
export type Candidate = CandidateRecord & { matchScore: number; match: MatchDetails };
export type CandidateSummary = Omit<Candidate, "match">;
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  statusCounts: Record<CandidateStatus, number>;
};
export type CandidateListResponse = { data: CandidateSummary[]; meta: PaginationMeta };
export type CandidateDetailResponse = { data: Candidate };
export type ApiError = { error: { code: string; message: string; details?: unknown } };
