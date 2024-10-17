import type { ReactElement, ReactNode } from "react";

export type Tab = {
	label: string;
	title: string;
	href?: string;
	icon: ReactElement;
	headerNode?: ReactNode;
};
