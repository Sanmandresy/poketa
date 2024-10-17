import type { Dispatch, SetStateAction } from "react";
import type { KOf } from "types";

export const useObject = <T>(setAction: Dispatch<SetStateAction<T>>) => {
	const updateObjectProperty = (propertyName: KOf<T>, newValue: unknown) => {
		setAction((prev) => ({
			...prev,
			[propertyName]: newValue,
		}));
	};
	const cleanObjectValues = (propertyName?: string) => {
		if (propertyName) {
			setAction((prev) => ({
				...prev,
				[propertyName]: "",
			}));
		}
		// If no property is specified then all will be cleansed
		else {
			setAction((prev) => {
				// @ts-ignore
				const cleaned = Object.entries(prev).reduce((acc, [key, value]) => {
					if (typeof value === "string") {
						acc[key] = "";
					} else {
						acc[key] = undefined;
					}
					return acc;
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				}, {} as any);
				return cleaned;
			});
		}
	};

	return { updateObjectProperty, cleanObjectValues };
};
