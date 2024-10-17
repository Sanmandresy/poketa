import type { PropsWithChildren } from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { styled } from "tamagui";

const Button = styled(TouchableOpacity, {});
type ActionButtonProps = PropsWithChildren & TouchableOpacityProps;

export const ActionButton = ({ children, ...rest }: ActionButtonProps) => {
	return <Button {...rest}>{children}</Button>;
};
