import { Camera, Check, GalleryHorizontal } from "@tamagui/lucide-icons";
import { AppLayout, Header, ImagePreview } from "components";
import { currentUserId, toProfile } from "../../../constants";
import { useCache, useDevice, useFetch, useObject, useSubmit } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { H5, H6, Input, useTheme, XStack, YStack } from "tamagui";
import type { User } from "types";
import { userRepository } from "database";
import { isBlank, isEmail } from "../../../util";
import { useRouter } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";

export default function ProfileEdit() {
	const theme = useTheme();
	const { getCached } = useCache();
	const router = useRouter();
	const { pickImage, takePicture } = useDevice();
	const [profile, setProfile] = useState<User>({
		// @ts-ignore
		id: getCached(currentUserId),
		username: "",
		avatar: "",
	});

	const { data, refetch, invalidate } = useFetch<User>(
		// @ts-ignore
		["profile", getCached(currentUserId)],
		async () => await userRepository.findOne?.(getCached(currentUserId))
	);

	useEffect(() => {
		if (data) {
			setProfile((prev) => ({
				...prev,
				username: data.username,
				avatar: data.avatar,
			}));
		}
	}, [data]);

	const { updateObjectProperty } = useObject(setProfile);

	const { submit, isSuccess } = useSubmit<User[]>(async (user) => {
		await userRepository.saveOrUpdate?.(user);
	});

	const handleSubmit = useCallback(async () => {
		if (isBlank(profile.username) || isEmail(profile.username)) {
			Alert.alert("Veuillez saisir un pseudo valide");
			return;
		}
		try {
			await submit([profile]);
			await invalidate();
			await refetch();
		} catch (error) {
			console.error("Error in handleSubmit:", error);
			Alert.alert("Une erreur s'est produite");
		}
	}, [profile, submit, invalidate, refetch]);

	useEffect(() => {
		if (isSuccess) {
			router.navigate(toProfile);
		}
	}, [isSuccess, router]);

	const handleImagePick = useCallback(
		async (source: "camera" | "gallery") => {
			const result =
				source === "camera" ? await takePicture() : await pickImage();
			if (result) {
				updateObjectProperty("avatar", result.base64);
			}
		},
		[takePicture, pickImage, updateObjectProperty]
	);

	return (
		<AppLayout>
			<Header paddingHorizontal="$3" jc="space-between">
				<H5 color={theme.black10.val} size={"$8"}>
					Profil
				</H5>
				<TouchableOpacity onPress={handleSubmit}>
					<Check color={theme.black10.val} />
				</TouchableOpacity>
			</Header>
			<ImagePreview
				width="100%"
				height="$14"
				encoding="base64"
				type="avatar"
				size="$12"
				source={profile.avatar}
			/>
			<XStack display="flex" jc="center" gap="$5" marginVertical="$2">
				<TouchableOpacity onPress={() => handleImagePick("camera")}>
					<Camera />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleImagePick("gallery")}>
					<GalleryHorizontal />
				</TouchableOpacity>
			</XStack>
			<YStack paddingHorizontal="$3" gap="$4" marginVertical="$4">
				<H6 size={"$6"} textTransform="capitalize">
					Pseudo
				</H6>
				<Input
					value={profile.username}
					onChangeText={(value) => updateObjectProperty("username", value)}
				/>
			</YStack>
		</AppLayout>
	);
}
