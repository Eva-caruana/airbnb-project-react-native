import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";
// récupérer tout le module location
import * as Location from "expo-location";
import axios from "axios";
import Loader from "../../components/Loader";

export default function AroundMeScreen() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  // state pour stocker la position utilisateur et centrer la map
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // gère la permission + récupération position + appel API
    const askPermission = async () => {
      try {
        // demander la permission de localisation
        let { status } = await Location.requestForegroundPermissionsAsync();

        // si refus, on met une erreur
        if (status !== "granted") {
          setError(true);
          return;
        }

        // récupérer la position du téléphone
        const location = await Location.getCurrentPositionAsync({});

        // extraction latitude / longitude depuis l'objet location
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        // set du state coords pour centrer la map
        setCoords({
          latitude,
          longitude,
          // zoom de base de la carte
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });

        // appel API avec paramètres dynamiques (position utilisateur)
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around",
          {
            params: {
              latitude,
              longitude,
            },
          },
        );

        // stockage des données récupérées
        setData(response.data);
      } catch (error) {
        console.log(error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    };

    askPermission();
  }, []);

  // si chargement en cours, on affiche un loader
  if (isLoading) {
    return <Loader />;
  }

  // si permission refusée
  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Permission refusée</Text>
      </View>
    );
  }

  return (
    <MapView
      // la map doit avoir une dimension
      style={{ flex: 1 }}
      // position initiale basée sur les coords utilisateur
      initialRegion={coords}
      // affiche le point bleu de l'utilisateur
      showsUserLocation={true}
    >
      {/* affichage des markers à partir des données API */}
      {data.map((room) => {
        return (
          <Marker
            key={room._id}
            // conversion du format API [lng, lat] vers latitude / longitude
            coordinate={{
              latitude: room.location[1],
              longitude: room.location[0],
            }}
            title={room.title}
            onPress={() => {
              router.push({ pathname: "/home/room", params: { id: room._id } });
            }}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  // style du loader centré
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
