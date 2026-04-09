import { useContext } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function RootNavigator() {
  const { userID, userToken, isLoading } = useContext(AuthContext);

  const isAuthenticated = !!userID && !!userToken;
  // console.log("ROOT NAV", userID, userToken, isLoading);
  // console.log("LOGIN CONTEXT", userID, userToken);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* loader */}
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // isLoading = true = on lit async Storage
  // quand c’est fini = isLoading = false
  // ensuite seulement on décide entre (auth) et (main)
  // console.log("ROOT NAV", userID, userToken, isLoading, isAuthenticated);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(main)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
