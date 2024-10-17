import { Link, type LinkProps } from "expo-router";
import { styled } from "tamagui";
import type { ReactElement } from "react";
import { TouchableOpacity } from "react-native";

type LinkButtonProps = LinkProps<string> & {
	content: string | ReactElement;
};

const Opacity = styled(TouchableOpacity, {});

export const LinkButton = ({ href, content, ...rest }: LinkButtonProps) => {
	return (
		<Opacity>
			<Link href={href} {...rest}>
				{content}
			</Link>
		</Opacity>
	);
};
