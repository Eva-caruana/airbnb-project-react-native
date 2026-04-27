import { useContext } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../context/AuthContext";

import MainButton from "../../components/MainButton";
import Loader from "../../components/Loader";
import Input from "../../components/Input";
import LargeInput from "../../components/LargeInput";
import AvatarPicker from "../../components/AvatarPicker";

import { useProfilePhoto } from "../../hook/useProfilePhoto";
import { useProfileForm } from "../../hook/useProfileForm";

export default function ProfilePage() {
  const { logout, userID, userToken } = useContext(AuthContext);

  // Hook dédié à la sélection photo galerie/caméra
  const { newPhoto, pickImage, takePhoto } = useProfilePhoto();

  // Hook dédié aux données profil et aux requêtes API
  const {
    isLoading,
    data,
    newEmail,
    setNewEmail,
    newDescription,
    setNewDescription,
    newUsername,
    setNewUsername,
    handleUpdate,
  } = useProfileForm(userID, userToken);

  // Priorité à la nouvelle photo locale, sinon photo déjà enregistrée
  const photoUri = newPhoto?.uri || data?.photo?.url;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Permet de fermer le clavier en touchant hors des inputs */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <AvatarPicker
              photoUri={photoUri}
              onPickImage={pickImage}
              onTakePhoto={takePhoto}
            />

            <Input
              state={newEmail}
              setState={setNewEmail}
              placeholder="email"
            />

            <Input
              state={newUsername}
              setState={setNewUsername}
              placeholder="username"
            />

            <LargeInput
              state={newDescription}
              setState={setNewDescription}
              placeholder="Description"
            />

            <MainButton text="Update" onPress={() => handleUpdate(newPhoto)} />

            <MainButton text="Logout" onPress={logout} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
