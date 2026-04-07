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

  const renderStars = (ratingValue) => {
    const stars = [];
    const roundedRating = Math.round(ratingValue);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={i <= roundedRating ? styles.yellowStar : styles.grayStar}
        >
          ★
        </Text>,
      );
    }

    return <View style={styles.starsContainer}>{stars}</View>;
  };

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
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>{item.price} €</Text>
          </View>
        </ImageBackground>

        <View style={styles.infoSection}>
          <View style={styles.textSection}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>

            <View style={styles.detailsRow}>
              {renderStars(item.ratingValue)}
              <Text style={styles.reviewsText}>{item.reviews} reviews</Text>
            </View>
          </View>

          <Image
            source={{ uri: item.user.account.photo.url }}
            style={styles.avatar}
          />
        </View>
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
  priceBox: {
    backgroundColor: "black",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 15,
  },
  priceText: {
    color: "white",
    fontSize: 16,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },
  textSection: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  yellowStar: {
    color: "#FFB100",
    fontSize: 16,
  },
  grayStar: {
    color: "#C4C4C4",
    fontSize: 16,
  },
  reviewsText: {
    color: "gray",
    fontSize: 13,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
