import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ErrorMessage({ errorMessage }) {
  if (!errorMessage) return null;

  return <Text style={styles.errorMessage}>{errorMessage}</Text>;
}
const styles = StyleSheet.create({
  buttonsSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },

  errorMessage: {
    color: "red",
    fontSize: 15,
  },
});
