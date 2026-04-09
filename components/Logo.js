import { View, Image, StyleSheet } from "react-native";

export default function Logo({ size }) {
  return (
    <View>
      <Image
        source={require("../assets/img/logo.png")}
        style={size === "large" ? styles.largeLogo : styles.smallLogo}
        resizeMode={"contain"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  largeLogo: {
    height: 100,
    width: 100,
    marginTop: 10,
    marginBottom: 30,
  },
  smallLogo: {
    height: 30,
    width: 30,
  },
});
