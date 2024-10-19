import { SizableText, XStack } from "tamagui";

export const Loading = () => {
	return (
		<XStack py="$5" ai="center" jc="center">
			<SizableText size="$5">En cours de chargement...</SizableText>
		</XStack>
	);
};
