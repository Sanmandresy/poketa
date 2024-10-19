import { useState } from "react";

export const usePagination = (limit?: number) => {
	const defaultPage = 1;
	const pageSize = limit ?? 10;
	const [page, setPage] = useState(defaultPage);
	const next = () => setPage((prev) => prev + 1);
	const previous = () =>
		setPage((prev) => {
			if (prev > 1) return prev - 1;
			return prev;
		});
	return { page, next, previous, pageSize };
};
