import { Link, type LinkProps } from "expo-router";
import { styled } from "tamagui";
import type { ReactElement } from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

type LinkButtonProps = TouchableOpacityProps & {
	content: string | ReactElement;
	href: LinkProps<string>["href"];
};

const Opacity = styled(TouchableOpacity, {});

export const LinkButton = ({ href, content, ...rest }: LinkButtonProps) => {
	return (
		<Opacity {...rest}>
			<Link href={href}>{content}</Link>
		</Opacity>
	);
};
