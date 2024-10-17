import { CircleUserRound, ArrowLeftRight, Edit3 } from "@tamagui/lucide-icons";
import { LinkButton } from "components";
import type { Tab } from "types";
import { toProfileEdit } from "./path";

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
		headerNode: (
			<LinkButton
				style={{ marginRight: 5 }}
				href={toProfileEdit}
				content={<Edit3 />}
			/>
		),
	},
];
