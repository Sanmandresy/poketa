import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useFetch = <T>(
	queryKey: (string | number | undefined)[],
	callback: () => Promise<T | null | unknown>
) => {
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey,
		queryFn: callback,
	});
	const refetch = useCallback(() => query.refetch(), [query]);
	const invalidate = useCallback(
		() =>
			queryClient.invalidateQueries({
				queryKey,
			}),
		[queryClient, queryKey]
	);
	return {
		data: query.data as T,
		refetch,
		invalidate,
		isLoading: query.isLoading,
		isError: query.isError,
		isFetching: query.isFetching,
	};
};
