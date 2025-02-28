import "../tamagui-web.css";

import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "./Provider";
import { useTheme } from "tamagui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { database } from "database";
import migrations from "database/migration/migrations";

const queryClient = new QueryClient();

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { success } = useMigrations(database, migrations);
	const [interLoaded, interError] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});

	useEffect(() => {
		if ((interLoaded || interError) && success) {
			// Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
			SplashScreen.hideAsync();
		}
	}, [interLoaded, interError, success]);

	if (!interLoaded && !interError) {
		return null;
	}
	if (!success) {
		return null;
	}

	return (
		<Providers>
			<RootLayoutNav />
		</Providers>
	);
}

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <Provider>{children}</Provider>;
};

function RootLayoutNav() {
	const colorScheme = useColorScheme();
	const theme = useTheme();
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<StatusBar
					barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
				/>
				<Stack>
					<Stack.Screen
						name="(tabs)"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false,
							contentStyle: {
								backgroundColor: theme.background.val,
							},
						}}
					/>
					<Stack.Screen
						name="setup"
						options={{
							presentation: "modal",
							animation: "slide_from_right",
							gestureEnabled: false,
							headerShown: false,
							contentStyle: {
								backgroundColor: theme.background.val,
							},
						}}
					/>
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
