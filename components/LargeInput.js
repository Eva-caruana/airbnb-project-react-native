import { StyleSheet, TextInput } from "react-native";

import colors from "../assets/colors/main.json";
const LargeInput = ({ state, setState, placeholder }) => {
  return (
    <TextInput
      style={styles.textInput}
      value={state}
      onChangeText={setState}
      placeholder={placeholder}
      multiline={true}
      numberOfLines={10}
      maxLength={250}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: colors.pink,
    borderWidth: 2,
    width: "80%",
    marginBottom: 30,
    marginTop: 15,
    fontSize: 16,
    height: 100,
    padding: 10,
  },
});
export default LargeInput;
