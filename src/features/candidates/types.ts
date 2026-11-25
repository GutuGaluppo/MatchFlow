import type { CandidateRecord, CandidateStatus } from "../../types";

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

export type CandidateListResponse = {
	data: CandidateRecord[];
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		statusCounts: Record<CandidateStatus, number>;
	};
};

export type CandidateCardProps = {
	candidate: CandidateRecord;
	onSchedule?: (id: string) => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onView?: (id: string) => void;
	score?: number;
};

export type CandidateListProps = {
	candidates: CandidateRecord[];
	isLoading?: boolean;
	onSchedule?: (id: string) => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onView?: (id: string) => void;
};

export type DashboardStatCard = {
	label: string;
	count: number;
	percentage: number;
	variant?: "default" | "new" | "shortlisted" | "interview" | "rejected";
};

export type DashboardMetrics = {
	total: number;
	stats: DashboardStatCard[];
};

export const STATUS_LABEL_MAP: Record<CandidateStatus, string> = {
	new: "New",
	shortlisted: "Shortlisted",
	interview: "Interview",
	rejected: "Rejected",
};
