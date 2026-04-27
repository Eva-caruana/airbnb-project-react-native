import { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

//acceder a la galerie user et changer de photo
import * as ImagePicker from "expo-image-picker";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";

import MainButton from "../../components/MainButton";
import Loader from "../../components/Loader";
import colors from "../../assets/colors/main.json";
import Input from "../../components/Input";
import LargeInput from "../../components/LargeInput";

export default function ProfilePage() {
  const { logout, userID, userToken } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);

  //Appel de lapi avec use effect pour avoir les infos de luser
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );

        // Stockage des données utilisateur
        setData(response.data);

        // Initialisation des champs modifiables
        setNewEmail(response.data.email);
        setNewDescription(response.data.description);
        setNewUsername(response.data.username);
      } catch (error) {
        console.log(error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userID, userToken]);

  // Mise à jour des informations texte : email, username, description
  const updateData = async () => {
    try {
      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",

        {
          email: newEmail,
          description: newDescription,
          username: newUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      setData(response.data);
      setNewEmail(response.data.email);
      setNewUsername(response.data.username);
      setNewDescription(response.data.description);
    } catch (error) {
      console.log(error.response || error.message || error);
    }
  };

  // Mise à jour de la photo de profil
  const updatePhoto = async () => {
    // Si aucune nouvelle photo n'a été sélectionnée, on ne fait rien
    if (!newPhoto) {
      return;
    }
    try {
      // FormData est nécessaire pour envoyer un fichier image
      const formData = new FormData();

      formData.append("photo", {
        uri: newPhoto.uri,
        name: "profile.jpg",
        type: "image/jpeg",
      });

      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setData(response.data);
    } catch (error) {
      console.log(error.response || error.message || error);
    }
  };

  // Bouton update : met à jour les infos, puis la photo si une nouvelle photo existe
  const handleUpdate = async () => {
    console.log("click update");
    await updateData();

    if (newPhoto) {
      await updatePhoto();
      console.log("updated");
    }
  };

  // bouton galerie
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewPhoto(result.assets[0]);
    }
  };

  // bouton caméra
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission caméra refusée");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewPhoto(result.assets[0]);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {/* Image utilisateur  */}
            <View style={styles.userImageSection}>
              {newPhoto?.uri ? (
                <Image
                  style={styles.avatarPlaceholder}
                  source={{ uri: newPhoto.uri }}
                />
              ) : data?.photo?.url ? (
                <Image
                  style={styles.avatarPlaceholder}
                  source={{ uri: data.photo.url }}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={120} color="#E0E0E0" />
                </View>
              )}

              {/* Boutons */}
              <View style={styles.buttons}>
                <Pressable onPress={pickImage}>
                  <SimpleLineIcons
                    name="picture"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </Pressable>

                <Pressable onPress={takePhoto}>
                  <Feather
                    name="camera"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </Pressable>
              </View>
            </View>
            <Input
              state={newEmail}
              setState={setNewEmail}
              placeholder={"email"}
            />
            <Input
              state={newUsername}
              setState={setNewUsername}
              placeholder={"username"}
            />
            <LargeInput
              state={newDescription}
              setState={setNewDescription}
              placeholder={"Description"}
            />
            <MainButton
              text={"Update"}
              onPress={() => {
                console.log("CLICK");
                handleUpdate();
              }}
            />
            <MainButton text={"Logout"} onPress={logout} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  userImageSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  // userImage: {
  //   //  flex: 1,
  //   height: 50,
  //   width: 50,
  //   borderRadius: 50,
  //   borderColor: colors.pink,
  // },

  icon: {
    height: 30,
    width: 30,
    color: "#717171",
  },
  buttons: {
    gap: 20,
  },
  avatarPlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: colors.pink,
    justifyContent: "center",
    alignItems: "center",
  },
});
