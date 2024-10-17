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
			}}
		>
			{tabs.map((tab, index) => (
				<Tabs.Screen
					name={tab.label}
					key={`k${index}-${tab.label}`}
					options={{
						title: tab.title,
						headerShown: false,
						tabBarInactiveTintColor: theme.black10.val,
						tabBarIcon: ({ color, size }) => (
							<TabIcon color={color} icon={tab.icon} size={size} />
						),
					}}
				/>
			))}
		</Tabs>
	);
}
