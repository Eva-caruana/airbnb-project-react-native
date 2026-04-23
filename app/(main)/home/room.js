import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import axios from "axios";
import PriceView from "../../../components/PriceView";
import Informations from "../../../components/Infomations";
import colors from "../../../assets/colors/main.json";

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
        setIsLoading(false);
        // console.log("ROOM API =", response.data);
      } catch (error) {
        console.log(error.response || error.message || error);
      }
    };
    fetchRoom();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
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
});
