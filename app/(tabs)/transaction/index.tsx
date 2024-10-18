import { Plus } from "@tamagui/lucide-icons";
import { AppLayout, Header, LinkButton } from "components";
import { toAddTransaction } from "../../../constants";
import { H5, useTheme } from "tamagui";

export default function Transactions() {
	const theme = useTheme();
	return (
		<AppLayout>
			<Header paddingHorizontal="$3" jc="space-between">
				<H5 color={theme.black10.val} size={"$8"}>
					Transaction
				</H5>
				<LinkButton
					content={<Plus color={theme.black10.val} />}
					href={toAddTransaction}
				/>
			</Header>
		</AppLayout>
	);
}
