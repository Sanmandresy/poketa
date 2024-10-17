import { useCallback } from "react";
import {
	Avatar,
	SizableText,
	Image,
	YStack,
	type YStackProps,
	type SizeTokens,
	View,
} from "tamagui";

type PreviewProps = YStackProps & {
	type: "image" | "avatar";
	encoding: "uri" | "base64";
	source: string;
	label?: string;
	size?: number | SizeTokens;
	roundUpTo?: number | SizeTokens;
};

export const ImagePreview = ({
	type,
	encoding,
	source,
	label,
	size,
	roundUpTo,
	...rest
}: PreviewProps) => {
	const renderImage = useCallback(() => {
		const uri =
			encoding === "uri"
				? source
				: `data:application/octet-stream;base64,${source}`;
		if (type === "avatar") {
			return (
				<Avatar
					circular
					size={size}
					borderWidth={"$0.5"}
					borderColor={"$red5"}
					backgroundColor={"$red10"}
				>
					<Avatar.Image
						source={{
							uri,
						}}
					/>
					<Avatar.Fallback backgroundColor="$white0" />
				</Avatar>
			);
		}
		return (
			<View width={size} height={size} borderRadius={roundUpTo}>
				<Image width="100%" height="100%" objectFit="cover" source={{ uri }} />
			</View>
		);
	}, [type, encoding, source, size, roundUpTo]);

	return (
		<YStack
			{...rest}
			ai={"center"}
			display="flex"
			justifyContent={"center"}
			flexDirection="column"
			gap="$3"
		>
			{renderImage()}
			{label && <SizableText size="$6">{label}</SizableText>}
		</YStack>
	);
};
