import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { dateFormatter } from "@/utils/date-formatter";
import { findTravelerById } from "@/constants/traveler-option";
import { Colors } from "@/constants/Colors";
import TravelDetailCard from "./TravelDetailCard";
import { UserTripData } from "@/types/trip";
import { useRouter } from "expo-router";
import { getRandomImageArray } from "@/utils/travel-images";
import { capitalize } from "@/utils/word-formatter";
import { findBudgetById } from "@/constants/budget-option";

export default function UserTripList({ data }: { data: UserTripData[] }) {
  const router = useRouter();

  if (!data || data.length === 0) {
    return <Text>No data</Text>;
  }

  const images = getRandomImageArray(data.length);

  const handlePress = (trip: UserTripData, image: string) => {
    router.push({
      pathname: "/trip-details",
      params: {
        trip: JSON.stringify(trip),
        image: JSON.stringify(image),
      },
    });
  };

  const renderTripDetails = (trip: UserTripData) => {
    return (
      <View style={styles.tripDetails}>
        <Text style={styles.tripDetailText}>
          {dateFormatter(
            new Date(trip.tripData.startDate.seconds * 1000),
            new Date(trip.tripData.endDate.seconds * 1000)
          )}
        </Text>
        <Text style={styles.tripDetailText}>
          {findTravelerById(trip.tripData.traveler)?.icon}
          {findTravelerById(trip.tripData.traveler)?.title} {"  "}|{"  "}
          {findBudgetById(trip.tripData.budget)?.icon}
          {findBudgetById(trip.tripData.budget)?.title}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tripContainer}>
        <Image source={images[0]} style={styles.image} />
        <View style={styles.tripInfoContainer}>
          <Text style={styles.bigDestination}>
            {capitalize(data[0].tripData.destination)}
          </Text>
          {renderTripDetails(data[0])}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(data[0], images[0])}
        >
          <Text style={styles.buttonText}>See your plans</Text>
        </TouchableOpacity>
        {data.slice(1).map((trip, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(trip, images[index + 1])}
          >
            <TravelDetailCard {...trip.tripData} images={images[index + 1]} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  tripContainer: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  tripInfoContainer: {
    marginBottom: 10,
  },
  bigDestination: {
    fontSize: 24,
    color: "black",
    marginBottom: 5,
    fontFamily: "outfit-bold",
  },
  tripDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tripDetailText: {
    fontFamily: "outfit-medium",
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "outfit-medium",
  },
});
