import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";

import Logo from "../../components/Logo";
import Title from "../../components/Title";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import RedirectButton from "../../components/RedirectButton";
import ErrorMessage from "../../components/ErrorMessage";

import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import colors from "../../assets/colors/main.json";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const connect = async () => {
    // console.log("CONNECT CALLED");
    try {
      if (!email || !password) {
        setErrorMessage("Please fill all fields");
        return;
      }

      setErrorMessage("");

      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email,
          password,
        },
      );
      // console.log("ID SENT TO CONTEXT:", response.data.id);
      // console.log("TOKEN SENT TO CONTEXT:", response.data.token);
      login(response.data.id, response.data.token);
      console.log("cliked");
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo size="large" />
      <Title text={"Sign In"} />
      <Input placeholder="email" state={email} setState={setEmail} />
      <Input
        placeholder="password"
        state={password}
        setState={setPassword}
        secure={true}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <MainButton text="Sign In" onPress={connect} />
      <RedirectButton
        text={"No account ? Register"}
        func={() => {
          router.navigate("/signup");
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
