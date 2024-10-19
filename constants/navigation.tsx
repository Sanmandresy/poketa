import { CircleUserRound, ArrowLeftRight } from "@tamagui/lucide-icons";
import type { Tab } from "types";

export const tabs: Tab[] = [
	{
		label: "transaction",
		title: "Transaction",
		icon: <ArrowLeftRight />,
	},
	{
		label: "profile",
		title: "Profil",
		icon: <CircleUserRound />,
	},
];
