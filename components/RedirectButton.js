import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../assets/colors/main.json";

const RedirectButton = ({ text, func }) => {
  return (
    <Pressable onPress={func}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.grey,
  },
});

export default RedirectButton;
