import { Camera, Check, GalleryHorizontal } from "@tamagui/lucide-icons";
import { ActionButton, AppLayout, Header, ImagePreview } from "components";
import { H5, H6, Input, useTheme, XStack, YStack } from "tamagui";

export default function ProfileEdit() {
	const theme = useTheme();
	return (
		<AppLayout>
			<Header paddingHorizontal="$3" jc="space-between">
				<H5 color={theme.black10.val} size={"$8"}>
					Profil
				</H5>
				<ActionButton>
					<Check color={theme.black10.val} />
				</ActionButton>
			</Header>
			<ImagePreview
				width="100%"
				height="$14"
				encoding="base64"
				type="avatar"
				size="$12"
				source=""
			/>
			<XStack display="flex" jc="center" gap="$5" marginVertical="$2">
				<ActionButton>
					<Camera />
				</ActionButton>
				<ActionButton>
					<GalleryHorizontal />
				</ActionButton>
			</XStack>
			<YStack paddingHorizontal="$3" gap="$4" marginVertical="$4">
				<H6 size={"$6"} textTransform="capitalize">
					Pseudo
				</H6>
				<Input />
			</YStack>
		</AppLayout>
	);
}
