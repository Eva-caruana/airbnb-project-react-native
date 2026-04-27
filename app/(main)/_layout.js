import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import colors from "../../assets/colors/main.json";
import Logo from "../../components/Logo";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.pink,
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Around me",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="map-marker" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerTitle: () => {
            return <Logo size="small" />;
          },
        }}
      />
    </Tabs>
  );
}
