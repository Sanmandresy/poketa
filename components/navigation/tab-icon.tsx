import { type ReactElement, cloneElement } from "react";

type TabProps = {
	icon: ReactElement;
	color: string;
	size: number;
};

export const TabIcon = ({ icon, color, size }: TabProps) => {
	return cloneElement(icon, { color, size });
};
