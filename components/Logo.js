import { View, Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View>
      <Image
        source={require("../assets/img/logo.png")}
        style={[styles.mainLogo]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainLogo: {
    height: 200,
    width: 150,
    paddingTop: 60,
    resizeMode: "cover",
  },
});
