import { StyleSheet, Text } from "react-native";
import colors from "../assets/colors/main.json";

const Title = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.grey,
    fontWeight: 600,
    fontSize: 24,
  },
});
export default Title;
