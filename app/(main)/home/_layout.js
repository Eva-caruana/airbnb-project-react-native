import { Stack } from "expo-router";
import Logo from "../../../components/Logo";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "grey",
        headerTitle: () => {
          return <Logo />;
        },
      }}
    >
      <Stack.Screen name="rooms" />
      <Stack.Screen name="room" />
    </Stack>
  );
}
