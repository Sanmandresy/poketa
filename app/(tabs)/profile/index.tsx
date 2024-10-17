import { Edit3 } from "@tamagui/lucide-icons";
import { AppLayout, Header, ImagePreview, LinkButton } from "components";
import { toProfileEdit } from "../../../constants";
import { H5, useTheme } from "tamagui";

export default function Profile() {
	const theme = useTheme();
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
				source=""
				label="Pseudo"
			/>
		</AppLayout>
	);
}
