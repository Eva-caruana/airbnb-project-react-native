import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";

import Title from "../../components/Title";
import MainButton from "../../components/MainButton";

export default function ProfilePage() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title text={"Profile"} />

      <MainButton text={"Logout"} func={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
