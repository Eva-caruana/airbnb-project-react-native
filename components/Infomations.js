import { Image, StyleSheet, Text, View } from "react-native";

const displayStars = (ratingValue) => {
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

  return stars;
};

function Informations({ title, ratingValue, reviews, photo, description }) {
  return (
    <View style={styles.informations}>
      {/* Partie gauche */}
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.rating}>
          {displayStars(ratingValue)}
          <Text style={styles.ratingText}>{reviews} reviews</Text>
        </View>
      </View>

      {/* Avatar */}
      <View style={styles.imageView}>
        <Image source={{ uri: photo }} style={styles.profileImage} />
      </View>
    </View>
  );
}

export default Informations;

const styles = StyleSheet.create({
  informations: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  texts: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  yellowStar: {
    color: "#FFB100",
    fontSize: 16,
    marginRight: 4,
  },
  grayStar: {
    color: "#C4C4C4",
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    color: "gray",
    fontSize: 13,
  },
  imageView: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

//   infoSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 12,
//     alignItems: "center",
//   },
//   textSection: {
//     flex: 1,
//     paddingRight: 12,
//   },
//   title: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   detailsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   starsContainer: {
//     flexDirection: "row",
//     marginRight: 8,
//   },
//   yellowStar: {
//     color: "#FFB100",
//     fontSize: 16,
//   },
//   grayStar: {
//     color: "#C4C4C4",
//     fontSize: 16,
//   },
//   reviewsText: {
//     color: "gray",
//     fontSize: 13,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
