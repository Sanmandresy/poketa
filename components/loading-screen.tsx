import { Text } from "tamagui";
import { AppLayout } from "./layout";

export const LoadingScreen = () => {
	return (
		<AppLayout
			display="flex"
			contentContainerStyle={{
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
			}}
		>
			<Text>Chargement</Text>
		</AppLayout>
	);
};
