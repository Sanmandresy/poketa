import { useCallback, useState } from "react";

export const usePanel = () => {
	const [open, setOpen] = useState(false);

	const togglePanel = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	return { open, togglePanel };
};
