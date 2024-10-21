import { useCallback, useEffect } from "react";
import {
	styled,
	View,
	YStack,
	type ViewProps,
	Paragraph,
	useTheme,
	SizableText,
	XStack,
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
	Eye,
	Trash,
} from "@tamagui/lucide-icons";
import { formatNumber } from "../../util";
import { useRouter } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";
import { useSubmit } from "hooks";
import { transactionRepository } from "database";
import { toShowTransaction } from "../../constants";

type TransactionProps = ViewProps & Transaction;

const Card = styled(View, {
	display: "flex",
	width: "100%",
	flexDirection: "row",
	alignItems: "center",
	paddingHorizontal: 7,
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
	id,
	...rest
}: TransactionProps) => {
	const theme = useTheme();
	const size = 20;
	const router = useRouter();

	const { isSuccess, submit, invalidate } = useSubmit<string>(async (id) => {
		await transactionRepository.delete?.(id);
	});

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

	const redirect = useCallback(() => {
		router.navigate(`${toShowTransaction}${id}`);
	}, [id, router]);

	const remove = useCallback(async () => {
		try {
			await submit(id);
		} catch (error) {
			console.error("Error in remove:", error);
			Alert.alert("Une erreur s'est produite");
		}
	}, [id, submit]);

	useEffect(() => {
		if (isSuccess) {
			invalidate(["transactions"]);
		}
	}, [isSuccess, invalidate]);

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
			animation="bouncy"
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
			<XStack flexGrow={1} ai="center" gap="$3" jc="flex-end">
				<TouchableOpacity onPress={redirect}>
					<Eye size={size} color={theme.color.val} />
				</TouchableOpacity>
				<TouchableOpacity onPress={remove}>
					<Trash size={size} color={theme.color.val} />
				</TouchableOpacity>
			</XStack>
		</Card>
	);
};
