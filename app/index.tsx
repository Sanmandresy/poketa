import { LoadingScreen } from "../components";
import { userRepository } from "../database";
import { Redirect } from "expo-router";
import { useCache, useFetch } from "../hooks";
import type { User } from "../types";
import { currentUserId, toSetup, toTransactions } from "../constants";

export default function Entry() {
	const { getCached } = useCache();
	const { data, isLoading } = useFetch<User>(
		["profile", currentUserId],
		async () => {
			return await userRepository.findOne?.(getCached(currentUserId));
		}
	);

	if (isLoading) return <LoadingScreen />;
	if (!data) return <Redirect href={toSetup} />;
	return <Redirect href={toTransactions} />;
}
