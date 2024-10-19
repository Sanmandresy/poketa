import { YGroup } from "tamagui";
import type { Transaction } from "types";
import { TransactionItem } from "./item";
import { Empty, Loading } from "../display";

type ListProps = {
	isLoading: boolean;
	data: Transaction[];
	isEmpty: boolean;
};

export const TransactionList = (props: ListProps) => {
	if (props.isLoading) return <Loading />;
	if (props.isEmpty) return <Empty />;
	return (
		<YGroup px="$2" pt="$2" gap="$4" flexGrow={1}>
			{props.data?.map((transaction, index) => (
				<YGroup.Item key={`k${transaction.id}`}>
					<TransactionItem
						{...transaction}
						key={`${index}-${transaction.id}`}
					/>
				</YGroup.Item>
			))}
		</YGroup>
	);
};
