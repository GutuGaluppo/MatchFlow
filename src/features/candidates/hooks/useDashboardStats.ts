import { useMemo } from "react";
import type { CandidateRecord, PaginationMeta } from "../../../types";
import type { DashboardMetrics } from "../types";
import { STATUS_LABEL_MAP } from "../types";

export function useDashboardStats(
	candidates: CandidateRecord[],
	meta?: PaginationMeta,
): DashboardMetrics {
	return useMemo(() => {
		const total = meta?.total || candidates.length;
		const statusCounts = meta?.statusCounts || {
			new: candidates.filter((c) => c.status === "new").length,
			shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
			interview: candidates.filter((c) => c.status === "interview").length,
			rejected: candidates.filter((c) => c.status === "rejected").length,
		};

		const stats = [
			{
				label: "Total Applicants",
				count: total,
				percentage: 100,
				variant: "default" as const,
			},
			{
				label: STATUS_LABEL_MAP.new,
				count: statusCounts.new,
				percentage: total > 0 ? Math.round((statusCounts.new / total) * 100) : 0,
				variant: "new" as const,
			},
			{
				label: STATUS_LABEL_MAP.shortlisted,
				count: statusCounts.shortlisted,
				percentage: total > 0 ? Math.round((statusCounts.shortlisted / total) * 100) : 0,
				variant: "shortlisted" as const,
			},
			{
				label: STATUS_LABEL_MAP.interview,
				count: statusCounts.interview,
				percentage: total > 0 ? Math.round((statusCounts.interview / total) * 100) : 0,
				variant: "interview" as const,
			},
			{
				label: STATUS_LABEL_MAP.rejected,
				count: statusCounts.rejected,
				percentage: total > 0 ? Math.round((statusCounts.rejected / total) * 100) : 0,
				variant: "rejected" as const,
			},
		];

		return { total, stats };
	}, [candidates, meta]);
}
