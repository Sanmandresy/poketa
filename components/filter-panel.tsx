import { Search } from "@tamagui/lucide-icons";
import type { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";
import { Sheet, XStack } from "tamagui";

type FilterProps = PropsWithChildren & {
	open: boolean;
	togglePanel: () => void;
};

export const FilterPanel = ({ children, open, togglePanel }: FilterProps) => {
	return (
		<XStack jc="flex-end" px="$3" py="$2">
			<TouchableOpacity onPress={togglePanel}>
				<Search size={"$1"} />
			</TouchableOpacity>
			<Sheet
				forceRemoveScrollEnabled={open}
				open={open}
				onOpenChange={togglePanel}
				animation="medium"
				modal
				snapPoints={[90]}
				dismissOnSnapToBottom
			>
				<Sheet.Overlay
					animation="medium"
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
				/>

				<Sheet.Handle />
				<Sheet.Frame flex={1} flexDirection="column" py="$4" px="$5">
					<Sheet.ScrollView>{children}</Sheet.ScrollView>
				</Sheet.Frame>
			</Sheet>
		</XStack>
	);
};
