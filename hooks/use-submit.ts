import { useMutation, type UseMutationResult } from "@tanstack/react-query";

type MutationFunction<TData, TVariables> = (
	variables: TVariables
) => Promise<TData>;

interface UseSubmitResult<TVariables> {
	submit: (payload: TVariables) => Promise<void>;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: Error | null;
	reset: () => void;
}

export const useSubmit = <TVariables>(
	callback: MutationFunction<void, TVariables>
): UseSubmitResult<TVariables> => {
	const mutation: UseMutationResult<void, Error, TVariables> = useMutation<
		void,
		Error,
		TVariables
	>({
		mutationFn: callback,
	});

	const submit = async (payload: TVariables): Promise<void> => {
		try {
			await mutation.mutateAsync(payload);
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
