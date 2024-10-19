import { useCallback } from "react";
import {
	styled,
	View,
	YStack,
	type ViewProps,
	Paragraph,
	useTheme,
	SizableText,
} from "tamagui";
import { TransactionType, type Transaction } from "types";
import {
	ArrowRightLeft,
	CreditCard,
	HandCoins,
	HandHelping,
	SquareArrowLeft,
	SquareArrowRight,
	Wallet,
	Waypoints,
} from "@tamagui/lucide-icons";
import { formatNumber } from "../../util";

type TransactionProps = ViewProps & Transaction;

const Card = styled(View, {
	display: "flex",
	width: "100%",
	flexDirection: "row",
	alignItems: "center",
	paddingHorizontal: 5,
});

const Icon = styled(View, {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: 5,
});

export const TransactionItem = ({
	type,
	title,
	amount,
	...rest
}: TransactionProps) => {
	const theme = useTheme();
	const renderIcon = useCallback(() => {
		switch (type) {
			case TransactionType.INCOME:
				return <SquareArrowLeft color={"white"} />;
			case TransactionType.EXPENSE:
				return <SquareArrowRight color={"white"} />;
			case TransactionType.DONATION:
				return <HandCoins color={"white"} />;
			case TransactionType.INVESTMENT:
				return <Waypoints color={"white"} />;
			case TransactionType.LOAN:
				return <CreditCard color={"white"} />;
			case TransactionType.REPAYMENT:
				return <HandHelping color={"white"} />;
			case TransactionType.SAVINGS:
				return <Wallet color={"white"} />;
			case TransactionType.TRANSFER:
				return <ArrowRightLeft color={"white"} />;
			default:
				return <SquareArrowLeft color={"white"} />;
		}
	}, [type]);

	return (
		<Card
			{...rest}
			shadowColor={theme.shadowColor.val}
			backgroundColor={theme.background.val}
			shadowOffset={{
				width: 2,
				height: 1,
			}}
			gap="$3"
			py="$1"
			animation="tooltip"
			enterStyle={{
				opacity: 0,
				scale: 0.5,
			}}
		>
			<Icon backgroundColor={theme.red10.val} borderRadius={9999}>
				{renderIcon()}
			</Icon>
			<YStack ai="flex-start">
				<SizableText textTransform="capitalize" size="$6">
					{title}
				</SizableText>
				<Paragraph size={"$3"}>{formatNumber(amount)} Ariary</Paragraph>
			</YStack>
		</Card>
	);
};
