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
import { useCallback, useState } from "react";
import type { User } from "types";
import { useCache, useObject, useSubmit } from "hooks";
import { userRepository } from "database";
import { currentUserId, toProfile } from "../constants";
import { useRouter } from "expo-router";
import { SafeArea } from "components";
import { isBlank, isEmail } from "../util";
import { Alert } from "react-native";

export default function Setup() {
	const { cache } = useCache();
	const router = useRouter();
	// @ts-ignore
	const [user, setUser] = useState<User>({
		username: "",
	});
	const { updateObjectProperty } = useObject(setUser);

	const { submit, isSuccess } = useSubmit<User[]>(async (data) => {
		const result = await userRepository.saveOrUpdate?.(data);
		// @ts-ignore
		cache(currentUserId, result[0].id);
	});

	const handleSubmit = useCallback(async () => {
		if (!isBlank(user.username) && !isEmail(user.username)) {
			await submit([user]);
			if (isSuccess) {
				router.navigate(toProfile);
			}
		} else Alert.alert("Veuillez saisir un pseudo valide");
	}, [isSuccess, router.navigate, submit, user]);

	return (
		<SafeArea>
			<View
				flex={1}
				alignItems="center"
				justifyContent="center"
				gap="$8"
				enterStyle={{
					opacity: 0,
					scale: 0,
				}}
				animation={"bouncy"}
			>
				<XStack gap="$2" ai="center">
					<SizableText size="$8">Bienvenue sur</SizableText>
					<SizableText color={"$red10"} fontWeight={"bold"} size="$8">
						Poketa
					</SizableText>
				</XStack>
				<YStack gap="$5">
					<Paragraph size={"$4"}>
						Pour commencer, veuillez saisir votre pseudo
					</Paragraph>
					<Input
						value={user.username}
						onChangeText={(value) => updateObjectProperty("username", value)}
					/>
				</YStack>
				<Button
					onPress={handleSubmit}
					fontSize={"$4"}
					backgroundColor={"$red10"}
					color="white"
				>
					Commencer <LogIn color="white" size={"$1"} />
				</Button>
			</View>
		</SafeArea>
	);
}
