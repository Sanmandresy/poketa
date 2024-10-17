import { config as configBase } from "@tamagui/config/v3";
import { createAnimations } from "@tamagui/animations-react-native";
import { createTamagui } from "tamagui";

export const config = createTamagui({
	...configBase,
	animations: createAnimations({
		zoomIn: {
			toValue: 1,
			duration: 700,
			damping: 200,
		},
	}),
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
	interface TamaguiCustomConfig extends Conf {}
}
