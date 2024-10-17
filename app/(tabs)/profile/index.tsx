import { Edit3 } from "@tamagui/lucide-icons";
import { AppLayout, Header, ImagePreview, LinkButton } from "components";
import { currentUserId, toProfileEdit } from "../../../constants";
import { H5, useTheme } from "tamagui";
import { useCache, useFetch } from "hooks";
import type { User } from "types";
import { userRepository } from "database";

export default function Profile() {
	const theme = useTheme();
	const { getCached } = useCache();
	const { data } = useFetch<User>(
		// @ts-ignore
		["profile", getCached(currentUserId)],
		async () => await userRepository.findOne?.(getCached(currentUserId))
	);
	return (
		<AppLayout>
			<Header paddingHorizontal="$3" jc="space-between">
				<H5 color={theme.black10.val} size={"$8"}>
					Profil
				</H5>
				<LinkButton
					content={<Edit3 color={theme.black10.val} />}
					href={toProfileEdit}
				/>
			</Header>
			<ImagePreview
				width="100%"
				height="$16"
				encoding="base64"
				type="avatar"
				size="$12"
				source={data?.avatar}
				label={data?.username}
			/>
		</AppLayout>
	);
}
