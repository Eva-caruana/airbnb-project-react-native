import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import axios from "axios";
import PriceView from "../../../components/PriceView";
import Informations from "../../../components/Infomations";
import colors from "../../../assets/colors/main.json";
import Loader from "../../../components/Loader";

export default function Room() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`,
        );

        setData(response.data);

        // console.log("ROOM API =", response.data);
      } catch (error) {
        console.log(error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Annonce introuvable</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Swiper
        style={styles.swiper}
        loop={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={styles.pagination}
      >
        {/* On utilise un .map() car cest swiper qui gère le visuel du carrousel, si flatlist le visu doit etre géné manuellement (ex fleche suivant)*/}
        {data.photos.map((photo, index) => {
          return (
            <ImageBackground
              key={index}
              source={{ uri: photo.url }}
              style={styles.roomImage}
            >
              {/* Si premiere photo on affiche le prix */}
              {index === 0 && <PriceView price={data.price} />}
            </ImageBackground>
          );
        })}
      </Swiper>
      <View style={styles.roomInfo}>
        <Informations
          title={data.title}
          ratingValue={data.ratingValue}
          reviews={data.reviews}
          photo={data.user.account.photo.url}
        />
        <View>
          {/* On affiche 3 lignes si expanded vaut false */}
          <Text numberOfLines={expanded ? undefined : 3}>
            {data.description}
          </Text>
          <Pressable onPress={() => setExpanded(!expanded)}>
            <Text style={styles.textExpansion}>
              {expanded ? "Show less" : "Show more"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Afficher la localisation de la room */}
      <MapView
        // la map doit avoir une dimension
        style={styles.map}
        // position initiale basée sur paris
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          key={data._id}
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  roomImage: {
    width: "100%",
    height: 320,
    justifyContent: "flex-end",
  },
  roomInfo: {
    paddingHorizontal: 20,
  },
  textExpansion: {
    marginTop: 5,
    color: "#888",
  },
  dot: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  pagination: {
    bottom: 12,
  },
  swiper: {
    height: 320,
  },
  map: {
    height: 300,
    marginTop: 20,
  },
});
