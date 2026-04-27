import { View, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import colors from "../assets/colors/main.json";

export default function AvatarPicker({ photoUri, onPickImage, onTakePhoto }) {
  return (
    <View style={styles.container}>
      {/* Affiche la photo si elle existe, sinon une icône par défaut */}
      {photoUri ? (
        <Image style={styles.avatar} source={{ uri: photoUri }} />
      ) : (
        <View style={styles.avatar}>
          <Ionicons name="person" size={120} color="#E0E0E0" />
        </View>
      )}
      {/* Boutons de sélection photo : galerie et caméra */}
      <View style={styles.buttons}>
        <Pressable onPress={onPickImage}>
          <SimpleLineIcons name="picture" size={24} color="#717171" />
        </Pressable>

        <Pressable onPress={onTakePhoto}>
          <Feather name="camera" size={24} color="#717171" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: colors.pink,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    gap: 20,
  },
});
