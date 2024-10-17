import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, type ScrollViewProps, styled } from "tamagui";

type AppLayoutProps = PropsWithChildren & ScrollViewProps;

const SafeArea = styled(SafeAreaView, {
	height: "100%",
});

export const AppLayout = (props: AppLayoutProps) => {
	return (
		<SafeArea>
			<ScrollView
				style={{
					position: "relative",
				}}
				{...props}
			>
				{props.children}
			</ScrollView>
		</SafeArea>
	);
};
