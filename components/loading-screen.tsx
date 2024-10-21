import { Spinner, YStack } from "tamagui";
import { AppLayout } from "./layout";

export const LoadingScreen = () => {
	return (
		<AppLayout>
			<YStack h="100%" ai="center" jc="center">
				<Spinner size="large" color="$red10" />
			</YStack>
		</AppLayout>
	);
};
