import { XStack, type XStackProps } from "tamagui";
import type { PropsWithChildren } from "react";

type HeaderProps = PropsWithChildren & XStackProps;

export const Header = ({ children, ...rest }: HeaderProps) => {
	return (
		<XStack display="flex" ai="center" width={"100%"} height={"$5"} {...rest}>
			{children}
		</XStack>
	);
};
