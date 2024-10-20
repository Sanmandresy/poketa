import { AppLayout, Header, LinkButton } from "components";
import { toEditTransaction } from "../../../constants";
import { transactionRepository } from "database";
import { useLocalSearchParams } from "expo-router";
import { useFetch } from "hooks";
import { H4, H5, Paragraph, ScrollView, useTheme, YStack } from "tamagui";
import { translateType, type Transaction } from "types";
import { Edit3 } from "@tamagui/lucide-icons";
import { formatNumber } from "../../../util";

export default function TransactionShow() {
	const { id } = useLocalSearchParams();
	const theme = useTheme();
	const { data } = useFetch<Transaction>(
		// @ts-ignore
		["transaction", id],
		// @ts-ignore
		async () => await transactionRepository.findOne?.(id)
	);
	return (
		<AppLayout>
			<Header paddingHorizontal="$3" jc="space-between">
				<H5 color={theme.color.val} size={"$8"}>
					TN° {data?.id.split("-")[0]}...
				</H5>
				<LinkButton
					content={<Edit3 color={theme.color.val} />}
					href={{
						pathname: "/(tabs)/transaction/edit/[id]",
						params: { id: data?.id },
					}}
				/>
			</Header>
			<ScrollView
				display="flex"
				flexDirection="column"
				h="100%"
				px="$3"
				py="$5"
			>
				<YStack gap="$1" my="$2">
					<H4 textTransform="capitalize" fontSize="$6">
						Titre
					</H4>
					<Paragraph size="$5">{data?.title}</Paragraph>
				</YStack>
				<YStack gap="$1" my="$3">
					<H4 textTransform="capitalize" fontSize="$6">
						Montant
					</H4>
					<Paragraph size="$5">{formatNumber(data?.amount)} Ariary</Paragraph>
				</YStack>
				<YStack gap="$1" my="$3">
					<H4 textTransform="capitalize" fontSize="$6">
						Type
					</H4>
					<Paragraph size="$5">{translateType(data?.type)}</Paragraph>
				</YStack>
				<YStack gap="$1" my="$3">
					<H4 textTransform="capitalize" fontSize="$6">
						Description
					</H4>
					<Paragraph
						numberOfLines={10}
						h={"fit-content"}
						py="$1"
						size="$5"
						my="$1"
					>
						{data?.description}
					</Paragraph>
				</YStack>
				<YStack gap="$1" my="$3">
					<H4 textTransform="none" fontSize="$6">
						Émise le
					</H4>
					<Paragraph size="$5">{data?.issued_on}</Paragraph>
				</YStack>
				<YStack gap="$1" my="$3">
					<H4 textTransform="none" fontSize="$6">
						Mise à jour le
					</H4>
					<Paragraph size="$5">{data?.updated_on}</Paragraph>
				</YStack>
			</ScrollView>
		</AppLayout>
	);
}
