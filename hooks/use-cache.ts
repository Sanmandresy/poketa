import { useCallback } from "react";
import { getItem, setItem } from "expo-secure-store";

export const useCache = () => {
	const cache = useCallback((key: string, value: string) => {
		setItem(key, value);
	}, []);
	const getCached = useCallback((key: string) => {
		return getItem(key);
	}, []);
	return { cache, getCached };
};
