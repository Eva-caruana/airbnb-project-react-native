import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useProfilePhoto() {
  // Stocke uniquement la nouvelle photo choisie localement
  const [newPhoto, setNewPhoto] = useState(null);

  // Ouvre la galerie et stocke la photo sélectionnée
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Stocke uniquement la nouvelle photo choisie localement
    if (!result.canceled) {
      setNewPhoto(result.assets[0]);
    }
  };
  // Ouvre la caméra après avoir demandé l'autorisation
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
  // On expose la photo et les actions au composant Profile
  return {
    newPhoto,
    pickImage,
    takePhoto,
  };
}
