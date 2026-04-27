import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb";

export function useProfileForm(userID, userToken) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUsername, setNewUsername] = useState("");

  // Configuration réutilisée pour toutes les requêtes protégées
  const authConfig = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupère les informations du user connecté
        const response = await axios.get(
          `${API_URL}/user/${userID}`,
          authConfig,
        );
        // Stocke la réponse complète
        setData(response.data);

        // Initialise les champs avec les valeurs actuelles du profil
        setNewEmail(response.data.email);
        setNewDescription(response.data.description);
        setNewUsername(response.data.username);
      } catch (error) {
        console.log(error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    };
    // On lance la requête uniquement si le contexte auth est prêt
    if (userID && userToken) {
      fetchData();
    }
  }, [userID, userToken]);

  const updateData = async () => {
    // Met à jour les informations texte du profil
    const response = await axios.put(
      `${API_URL}/user/update`,
      {
        email: newEmail,
        description: newDescription,
        username: newUsername,
      },
      authConfig,
    );
    // Synchronise le front avec la réponse de l'API
    setData(response.data);
    setNewEmail(response.data.email);
    setNewUsername(response.data.username);
    setNewDescription(response.data.description);
  };

  const updatePhoto = async (newPhoto) => {
    if (!newPhoto) return;

    // FormData nécessaire pour envoyer une image
    const formData = new FormData();

    formData.append("photo", {
      uri: newPhoto.uri,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    const response = await axios.put(
      `${API_URL}/user/upload_picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    setData(response.data);
  };

  const handleUpdate = async (newPhoto) => {
    try {
      // Le bouton update met toujours à jour les infos texte
      await updateData();
      // La photo est mise à jour uniquement si une nouvelle photo existe
      if (newPhoto) {
        await updatePhoto(newPhoto);
      }
    } catch (error) {
      console.log(error.response || error.message || error);
    }
  };
  // On expose les données et actions nécessaires à ProfilePage
  return {
    isLoading,
    data,
    newEmail,
    setNewEmail,
    newDescription,
    setNewDescription,
    newUsername,
    setNewUsername,
    handleUpdate,
  };
}
