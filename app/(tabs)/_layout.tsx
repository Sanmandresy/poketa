import { Tabs } from "expo-router";
import { useTheme } from "tamagui";
import { tabs } from "../../constants";
import { TabIcon } from "components";

export default function TabLayout() {
	const theme = useTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.red10.val,
				tabBarStyle: {
					backgroundColor: theme.background.val,
					borderTopColor: theme.borderColor.val,
				},
				headerStyle: {
					backgroundColor: theme.background.val,
					borderBottomColor: theme.borderColor.val,
				},
				headerTintColor: theme.black10.val,
			}}
		>
			{tabs.map((tab, index) => (
				<Tabs.Screen
					name={tab.label}
					key={`k${index}-${tab.label}`}
					options={{
						title: tab.title,
						tabBarInactiveTintColor: theme.black10.val,
						tabBarIcon: ({ color, size }) => (
							<TabIcon color={color} icon={tab.icon} size={size} />
						),
						headerRight: () => tab.headerNode,
					}}
				/>
			))}
		</Tabs>
	);
}
