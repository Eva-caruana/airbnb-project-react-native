import { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import Title from "../../components/Title";
import MainButton from "../../components/MainButton";
import Loader from "../../components/Loader";

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
        setNewPhoto(response.data.photo);
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
    await updateData();

    if (newPhoto) {
      await updatePhoto();
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <Title text={"Profile"} />

      <MainButton text={"Update"} onPress={handleUpdate} />
      <MainButton text={"Logout"} onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
});
