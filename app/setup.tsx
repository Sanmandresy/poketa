import {
	Button,
	Input,
	Paragraph,
	SizableText,
	View,
	XStack,
	YStack,
} from "tamagui";
import { LogIn } from "@tamagui/lucide-icons";

export default function Setup() {
	return (
		<View flex={1} alignItems="center" justifyContent="center" gap="$10">
			<XStack gap="$2" ai="center" scale={0} opacity={0} animation={"zoomIn"}>
				<SizableText size="$9">Bienvenue sur</SizableText>
				<SizableText color={"$red10"} fontWeight={"bold"} size="$9">
					Poketa
				</SizableText>
			</XStack>
			<YStack gap="$5">
				<Paragraph size={"$5"}>
					Pour commencer, veuillez saisir votre pseudo
				</Paragraph>
				<Input />
			</YStack>
			<Button fontSize={"$5"} backgroundColor={"$red10"} color="white">
				Commencer <LogIn color="white" size={"$1"} />
			</Button>
		</View>
	);
}
