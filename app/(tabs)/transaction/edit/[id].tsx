import { Check } from "@tamagui/lucide-icons";
import { AppLayout, Header } from "components";
import { transactionRepository } from "database";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFetch, useObject, useSubmit } from "hooks";
import { useCallback, useEffect, useState } from "react";
import {
	Alert,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
	H4,
	H5,
	Input,
	ScrollView,
	TextArea,
	useTheme,
	View,
	YStack,
} from "tamagui";
import type { Transaction, TransactionType } from "types";
import { getCurrentDate, isBlank } from "../../../../util";
import { transactionTypes } from "../../../../constants";

export default function TransactionEdit() {
	const { id } = useLocalSearchParams();
	const theme = useTheme();
	const router = useRouter();
	// @ts-ignore
	const [transaction, setTransaction] = useState<Transaction>({});
	const { data, invalidate, refetch } = useFetch<Transaction>(
		// @ts-ignore
		["transaction", id],
		// @ts-ignore
		async () => await transactionRepository.findOne?.(id)
	);
	useEffect(() => {
		if (data) {
			setTransaction({ ...data, updated_on: getCurrentDate() });
		}
	}, [data]);

	const { updateObjectProperty } = useObject<Transaction>(setTransaction);

	const { submit, isSuccess } = useSubmit<Transaction[]>(
		async (transaction) => {
			await transactionRepository.saveOrUpdate?.(transaction);
		}
	);

	const handleSubmit = useCallback(async () => {
		if (isBlank(transaction?.title)) {
			Alert.alert("Le titre est obligatoire");
			return;
		}
		try {
			await submit([transaction]);
			await invalidate();
			await refetch();
		} catch (error) {
			console.error("Error in handleSubmit:", error);
			Alert.alert("Une erreur s'est produite");
		}
	}, [transaction, submit, invalidate, refetch]);

	useEffect(() => {
		if (isSuccess) {
			router.navigate({
				pathname: "/(tabs)/transaction/[id]",
				params: { id: transaction.id },
			});
		}
	}, [isSuccess, router, transaction]);

	return (
		<AppLayout>
			<Header paddingHorizontal="$3" jc="space-between">
				<H5 color={theme.color.val} size={"$8"}>
					Modifier la transaction
				</H5>
				<TouchableOpacity onPress={handleSubmit}>
					<Check color={theme.color.val} />
				</TouchableOpacity>
			</Header>
			<KeyboardAvoidingView
				style={{
					paddingBottom: 50,
					height: "100%",
				}}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					display="flex"
					flexDirection="column"
					h="100%"
					px="$3"
					py="$1"
				>
					<YStack gap="$1" my="$2">
						<H4 textTransform="capitalize" fontSize="$6">
							Titre
						</H4>
						<Input
							value={transaction?.title}
							onChangeText={(value) => updateObjectProperty("title", value)}
						/>
					</YStack>
					<YStack gap="$1" my="$3">
						<H4 textTransform="capitalize" fontSize="$6">
							Montant
						</H4>
						<Input
							keyboardType="numeric"
							value={`${transaction.amount}`}
							onChangeText={(value) => updateObjectProperty("amount", +value)}
						/>
					</YStack>
					<YStack gap="$1" my="$3">
						<H4 textTransform="capitalize" fontSize="$6">
							Type
						</H4>
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
								label: transaction.type,
								value: transaction.type,
								inputLabel: "Sélectionnez un type",
								color: theme.color.val,
							}}
						/>
					</YStack>
					<YStack gap="$1" my="$3">
						<H4 textTransform="capitalize" fontSize="$6">
							Description
						</H4>
						<TextArea
							numberOfLines={2}
							value={transaction.description}
							onChangeText={(value) =>
								updateObjectProperty("description", value)
							}
						/>
					</YStack>
				</ScrollView>
				<View height="$5" />
			</KeyboardAvoidingView>
		</AppLayout>
	);
}
