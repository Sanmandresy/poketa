import { useMutation, type UseMutationResult } from "@tanstack/react-query";

type MutationFunction<TData, TVariables> = (
	variables: TVariables
) => Promise<TData>;

interface UseSubmitResult<TData, TVariables> {
	submit: (payload: TVariables) => Promise<TData>;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: Error | null;
	reset: () => void;
}

export const useSubmit = <TData, TVariables>(
	mutationFn: MutationFunction<TData, TVariables>
): UseSubmitResult<TData, TVariables> => {
	const mutation: UseMutationResult<TData, Error, TVariables> = useMutation<
		TData,
		Error,
		TVariables
	>({
		mutationFn,
	});

	const submit = async (payload: TVariables): Promise<TData> => {
		try {
			return await mutation.mutateAsync(payload);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return {
		submit,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		isSuccess: mutation.isSuccess,
		error: mutation.error,
		reset: mutation.reset,
	};
};
