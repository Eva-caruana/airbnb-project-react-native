import { StyleSheet, Text, View } from "react-native";

function PriceView({ price }) {
  return (
    <View style={styles.priceView}>
      <Text style={styles.price}>{price} €</Text>
    </View>
  );
}

export default PriceView;

const styles = StyleSheet.create({
  priceView: {
    width: 100,
    height: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  price: {
    color: "white",
    fontSize: 20,
  },
});

//   priceBox: {
//     backgroundColor: "black",
//     alignSelf: "flex-start",
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     marginBottom: 15,
//   },
//   priceText: {
//     color: "white",
//     fontSize: 16,
//   },
