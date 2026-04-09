import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";

import Logo from "../../components/Logo";
import Title from "../../components/Title";
import Input from "../../components/Input";
import LargeInput from "../../components/LargeInput";
import MainButton from "../../components/MainButton";
import ErrorMessage from "../../components/ErrorMessage";
import RedirectButton from "../../components/RedirectButton";

import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

const SignupPage = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const handleSignUp = async () => {
    try {
      if (
        !email ||
        !username ||
        !description ||
        !password ||
        !confirmPassword
      ) {
        setErrorMessage("Please fill all fields");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      setErrorMessage("");

      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        },
      );

      login(response.data.id, response.data.token);
    } catch (error) {
      // ici on gère les erreurs API
      if (
        error.response?.data?.message === "This email already has an account"
      ) {
        setErrorMessage("User already exists");
      } else {
        setErrorMessage(error.response?.data.error);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo size="large" />
      <Title text={"Sign Up"} />
      <Input state={email} setState={setEmail} placeholder={"email"} />
      <Input state={username} setState={setUsername} placeholder={"username"} />
      <LargeInput
        state={description}
        setState={setDescription}
        placeholder={"Describe yourself in a few words"}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder={"password"}
        secure={true}
      />
      <Input
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"confirm password"}
        secure={true}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <MainButton text={"Sign Up"} func={handleSignUp} />
      <RedirectButton
        text={"Already have an account ? Sign in !"}
        func={() => {
          router.back();
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default SignupPage;
