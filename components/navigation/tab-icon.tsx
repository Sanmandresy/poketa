import React, { type ReactElement } from "react";

type TabProps = {
	icon: ReactElement;
	color: string;
	size: number;
};

export const TabIcon = ({ icon, color, size }: TabProps) => {
	return React.cloneElement(icon, { color, size });
};
