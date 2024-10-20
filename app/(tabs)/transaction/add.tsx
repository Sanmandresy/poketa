import { Check } from "@tamagui/lucide-icons";
import { AppLayout, Header } from "components";
import { useCallback, useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import {
	H5,
	Input,
	ScrollView,
	SizableText,
	TextArea,
	useTheme,
	YStack,
} from "tamagui";
import { TransactionType, type Transaction } from "types";
import { isBlank } from "../../../util";
import { useObject, useSubmit } from "hooks";
import RNPickerSelect from "react-native-picker-select";
import { toTransactions, transactionTypes } from "../../../constants";
import { transactionRepository } from "database";
import { useRouter } from "expo-router";

export default function AddTransaction() {
	const theme = useTheme();
	const router = useRouter();
	// @ts-ignore
	const [transaction, setTransaction] = useState<Transaction>({
		amount: 0,
		description: "",
		title: "",
		type: TransactionType.EXPENSE,
	});
	const { updateObjectProperty } = useObject<Transaction>(setTransaction);
	const { submit, isSuccess, invalidate } = useSubmit<Transaction[]>(
		async (transaction) => {
			await transactionRepository.saveOrUpdate?.(transaction);
		}
	);
	const handleSubmit = useCallback(async () => {
		if (isBlank(transaction.title)) {
			Alert.alert("Le titre est obligatoire");
			return;
		}
		if (transaction.amount <= 0) {
			Alert.alert("Le montant doit être supérieur à 0");
			return;
		}
		try {
			await submit([transaction]);
			invalidate(["transactions"]);
		} catch (error) {
			console.error("Error in handleSubmit:", error);
			Alert.alert("Une erreur s'est produite");
		}
	}, [transaction, submit, invalidate]);

	useEffect(() => {
		if (isSuccess) {
			router.navigate(toTransactions);
		}
	}, [isSuccess, router]);

	return (
		<AppLayout>
			<Header paddingHorizontal="$3" jc="space-between">
				<H5 color={theme.color.val} size={"$8"}>
					Nouvelle transaction
				</H5>
				<TouchableOpacity onPress={handleSubmit}>
					<Check color={theme.color.val} />
				</TouchableOpacity>
			</Header>
			<ScrollView h="100%" px="$3">
				<YStack gap="$2" my="$2" w="100%" py="$2">
					<SizableText size="$5" textTransform="capitalize">
						Titre
					</SizableText>
					<Input
						value={transaction.title}
						onChangeText={(value) => updateObjectProperty("title", value)}
					/>
				</YStack>
				<YStack gap="$3" my="$2" w="100%" py="$2">
					<SizableText size="$5" textTransform="capitalize">
						Type
					</SizableText>
					<RNPickerSelect
						onValueChange={(value: TransactionType) =>
							updateObjectProperty("type", value)
						}
						items={transactionTypes}
						value={transaction.type}
						style={{
							viewContainer: {
								paddingVertical: 10,
								shadowOffset: { width: 2, height: 1 },
								paddingHorizontal: 3,
							},
						}}
						doneText="Choisir"
						placeholder={{
							label: "Seléctionnez un type",
							value: undefined,
							inputLabel: "Sélectionnez un type",
							color: theme.color.val,
						}}
					/>
				</YStack>
				<YStack gap="$3" my="$2" w="100%" py="$2">
					<SizableText size="$5" textTransform="capitalize">
						Montant
					</SizableText>
					<Input
						keyboardType="numeric"
						value={`${transaction.amount}`}
						onChangeText={(value) => updateObjectProperty("amount", +value)}
					/>
				</YStack>
				<YStack gap="$3" my="$2" w="100%" py="$2">
					<SizableText size="$5" textTransform="capitalize">
						Description
					</SizableText>
					<TextArea
						numberOfLines={10}
						size="$5"
						value={transaction.description}
						onChangeText={(value) => updateObjectProperty("description", value)}
					/>
				</YStack>
			</ScrollView>
		</AppLayout>
	);
}
