import { SizableText, XStack } from "tamagui";

export const Empty = () => {
	return (
		<XStack py="$5" ai="center" jc="center">
			<SizableText size="$5">Pas de données</SizableText>
		</XStack>
	);
};
