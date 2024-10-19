import { useCallback, type PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, type ScrollViewProps, styled, View } from "tamagui";

type AppLayoutProps = PropsWithChildren &
	ScrollViewProps & {
		scrollable?: boolean;
	};

const SafeArea = styled(SafeAreaView, {
	height: "100%",
	display: "flex",
});

export const AppLayout = ({
	scrollable = false,
	children,
	...rest
}: AppLayoutProps) => {
	const renderView = useCallback(() => {
		if (scrollable)
			return (
				<ScrollView
					style={{
						position: "relative",
					}}
					{...rest}
				>
					{children}
				</ScrollView>
			);
		return (
			<View
				style={{
					position: "relative",
				}}
				{...rest}
			>
				{children}
			</View>
		);
	}, [scrollable, children]);
	return <SafeArea>{renderView()}</SafeArea>;
};
