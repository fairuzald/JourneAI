import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { Hotel } from "@/types/trip";
import { getRandomImageArray } from "@/utils/travel-images";
import { Colors } from "@/constants/Colors";

export default function HotelInfo({ hotelData }: { hotelData: Hotel[] }) {
  const images = getRandomImageArray(hotelData.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotels Information</Text>
      <FlatList
        data={hotelData}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.googleMapUrl)}
            style={styles.hotelItem}
          >
            <Image source={images[index]} style={styles.hotelImage} />
            <Text style={styles.hotelName}>{item.name}</Text>
            <Text style={styles.hotelDescription}>{item.description}</Text>
            {item.address && (
              <Text style={styles.hotelAddress}>📍{item.address}</Text>
            )}
            <Text style={styles.hotelPrice}>
              {item.rating && `⭐ ${item.rating} ratings`}{" "}
              {item.price && `| 💸 ${item.price}/night`}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  listContentContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  hotelItem: {
    padding: 16,
    width: 250,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    gap: 5,
  },
  hotelImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  hotelName: {
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
  hotelDescription: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "#888",
  },
  hotelAddress: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "#888",
  },
  hotelPrice: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "#888",
  },
});
