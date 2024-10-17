import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useFetch = <T>(
	queryKey: string[],
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
		data: query.data,
		refetch,
		invalidate,
		isLoading: query.isLoading,
		isError: query.isError,
		isFetching: query.isFetching,
	};
};
