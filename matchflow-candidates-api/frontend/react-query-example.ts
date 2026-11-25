/** Example only. Install @tanstack/react-query in your React app to use these hooks. */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Candidate, CandidateListResponse, CandidateStatus } from "../src/types.ts";
import { candidateKeys, candidatesApi, type CandidateFilters } from "./api.ts";

export function useCandidates(filters: CandidateFilters) {
  // Query key must contain filters to prevent cached responses from mixing.
  return useQuery({ queryKey: candidateKeys.list(filters), queryFn: () => candidatesApi.list(filters) });
}

export function useCandidate(id: string) {
  return useQuery({ queryKey: candidateKeys.detail(id), queryFn: () => candidatesApi.get(id), enabled: !!id });
}

export function useUpdateCandidateStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, simulateError = false }: { id: string; status: CandidateStatus; simulateError?: boolean }) =>
      candidatesApi.updateStatus(id, status, simulateError),
    onMutate: async ({id, status}) => {
      await queryClient.cancelQueries({ queryKey: candidateKeys.all });
      const previousLists = queryClient.getQueriesData<CandidateListResponse>({ queryKey: candidateKeys.lists() });
      const previousDetail = queryClient.getQueryData<{data: Candidate}>(candidateKeys.detail(id));
      queryClient.setQueriesData<CandidateListResponse>({ queryKey: candidateKeys.lists() }, old =>
        old ? { ...old, data: old.data.map(candidate => candidate.id === id ? { ...candidate, status } : candidate) } : old
      );
      queryClient.setQueryData<{data: Candidate}>(candidateKeys.detail(id), old =>
        old ? { data: { ...old.data, status } } : old
      );
      return { previousLists, previousDetail, id };
    },
    onError: (_error, _vars, context) => {
      context?.previousLists.forEach(([key, data]) => queryClient.setQueryData(key, data));
      if (context?.previousDetail) queryClient.setQueryData(candidateKeys.detail(context.id), context.previousDetail);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: candidateKeys.all })
  });
}
