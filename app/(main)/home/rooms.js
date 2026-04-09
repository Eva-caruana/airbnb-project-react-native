import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

import Informations from "../../../components/Infomations";
import PriceView from "../../../components/PriceView";

export default function rooms() {
  const { userToken } = useContext(AuthContext);
  const router = useRouter();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms",
        );

        setData(response.data);
      } catch (error) {
        console.log(error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // comment afficher une room
  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          router.push({
            pathname: "/home/room",
            params: { id: item._id },
          });
        }}
      >
        <ImageBackground
          source={{ uri: item.photos[0].url }}
          style={styles.roomImage}
          imageStyle={styles.roomImageStyle}
        >
          <PriceView price={item.price} />
        </ImageBackground>

        <Informations
          title={item.title}
          ratingValue={item.ratingValue}
          reviews={item.reviews}
          photo={item.user.account.photo.url}
        />
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 30,
  },
  roomImage: {
    width: "100%",
    height: 190,
    justifyContent: "flex-end",
  },
  roomImageStyle: {
    borderRadius: 12,
  },
});
