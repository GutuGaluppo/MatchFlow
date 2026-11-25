import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { CandidateRecord } from "../../../types";
import type { CandidateFilters } from "../types";
import { candidatesApi } from "../api/candidates";

export function useCandidates(filters: CandidateFilters = {}) {
	const queryClient = useQueryClient();

	const {
		data: candidates = [],
		isLoading,
		isFetching,
		error,
	} = useQuery({
		queryKey: ["candidates", filters] as const,
		queryFn: async ({ signal }) => {
			const response = await candidatesApi.list(filters, { signal });
			return response.data;
		},
		staleTime: 1000 * 30,
		gcTime: 1000 * 60 * 5,
	});

	const prefetchNextFilters = (nextFilters: CandidateFilters) => {
		queryClient.prefetchQuery({
			queryKey: ["candidates", nextFilters] as const,
			queryFn: async ({ signal }) => {
				const response = await candidatesApi.list(nextFilters, { signal });
				return response.data;
			},
		});
	};

	return {
		candidates: candidates as CandidateRecord[],
		isLoading,
		isFetching,
		error,
		prefetchNextFilters,
	};
}
