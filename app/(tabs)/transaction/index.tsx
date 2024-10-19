import { ArrowLeft, ArrowRight, Plus } from "@tamagui/lucide-icons";
import {
	AppLayout,
	FilterPanel,
	Header,
	LinkButton,
	TransactionList,
} from "components";
import { toAddTransaction, transactionTypes } from "../../../constants";
import {
	Button,
	H4,
	H5,
	Input,
	ScrollView,
	SizableText,
	useTheme,
	XStack,
	YStack,
} from "tamagui";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import type {
	Filter,
	Page,
	Transaction,
	TransactionFilter,
	TransactionType,
} from "types";
import { useFetch, useObject, usePagination, usePanel } from "hooks";
import { transactionRepository } from "database";
import { toUndefined } from "../../../util";
import { Alert, TouchableOpacity } from "react-native";

const paginationStyle = {
	display: "flex",
	alignItems: "center",
	flexDirection: "row",
	padding: 6,
	borderRadius: 9999,
};

export default function Transactions() {
	const theme = useTheme();
	const { open, togglePanel } = usePanel();
	const { next, previous, page, pageSize } = usePagination();
	const [filter, setFilter] = useState<Filter<Transaction>>({
		title: undefined,
		type: undefined,
	});
	const { data, refetch, invalidate, isLoading } = useFetch<Page<Transaction>>(
		["transactions", page, pageSize, filter.title, filter.type],
		async () => {
			const result = await transactionRepository.findAll?.(
				{ page, pageSize },
				{ title: toUndefined(filter.title), type: filter.type }
			);
			return result;
		}
	);
	const { updateObjectProperty } = useObject<Filter<Transaction>>(setFilter);

	const handleFilter = async () => {
		togglePanel();
		try {
			await refetch();
			await invalidate();
		} catch (error) {
			console.error("Error in handleFilter:", error);
			Alert.alert("Une erreur s'est produite");
		}
	};

	const handlePagination = async (type: "previous" | "next") => {
		if (type === "previous") {
			previous();
		} else {
			next();
		}
	};

	return (
		<AppLayout>
			<Header paddingHorizontal="$3" jc="space-between">
				<H5 color={theme.color.val} size={"$8"}>
					Transaction
				</H5>
				<LinkButton
					content={<Plus color={theme.color.val} />}
					href={toAddTransaction}
				/>
			</Header>
			<FilterPanel open={open} togglePanel={togglePanel}>
				<H4 textAlign="center">Filtres</H4>
				<YStack gap="$2" my="$2" w="100%" py="$2">
					<SizableText size="$5" textTransform="capitalize">
						Titre
					</SizableText>
					<Input
						value={filter?.title}
						onChangeText={(value) => updateObjectProperty("title", value)}
					/>
				</YStack>
				<YStack gap="$2" my="$2" w="100%" py="$2">
					<SizableText size="$5" textTransform="capitalize">
						Type
					</SizableText>
					<RNPickerSelect
						onValueChange={(value: TransactionType) =>
							updateObjectProperty("type", value)
						}
						items={transactionTypes}
						value={filter?.type}
						doneText="Choisir"
						style={{
							viewContainer: {
								paddingVertical: 10,
								shadowOffset: { width: 2, height: 1 },
								paddingHorizontal: 3,
							},
						}}
						placeholder={{
							label: "Seléctionnez un type",
							value: undefined,
							inputLabel: "Sélectionnez un type",
							color: theme.color.val,
						}}
					/>
				</YStack>
				<Button
					onPress={handleFilter}
					fontSize={"$5"}
					backgroundColor={"$red10"}
					color="white"
				>
					Filtrer
				</Button>
			</FilterPanel>

			<ScrollView flexGrow={1} h="100%">
				<TransactionList
					data={data?.data}
					isEmpty={data?.data.length === 0}
					isLoading={isLoading}
				/>
				<XStack jc="flex-end" gap="$5" px="$3" ai="center" pt="$5" pb="$11">
					<TouchableOpacity
						onPress={() => handlePagination("previous")}
						key="previous"
						// @ts-ignore
						style={{
							backgroundColor: theme.red10.val,
							opacity: page === 1 ? 0 : 1,
							...paginationStyle,
						}}
					>
						<ArrowLeft color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handlePagination("next")}
						key={"next"}
						// @ts-ignore
						style={{
							backgroundColor: theme.red10.val,
							opacity: data?.is_last_page ? 0 : 1,
							...paginationStyle,
						}}
					>
						<ArrowRight color="white" />
					</TouchableOpacity>
				</XStack>
			</ScrollView>
		</AppLayout>
	);
}
