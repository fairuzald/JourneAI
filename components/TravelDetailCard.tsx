import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { dateFormatter } from "@/utils/date-formatter";
import { Colors } from "@/constants/Colors";
import { findTravelerById } from "@/constants/traveler-option";
import { findBudgetById } from "@/constants/budget-option";
import { TripPropsFirebase } from "@/types/trip";
import { getRandomImage } from "@/utils/travel-images";

interface TravelDetailCardProps extends TripPropsFirebase {
  images?: any;
}

export default function TravelDetailCard({
  destination,
  traveler,
  startDate,
  endDate,
  totalDays,
  budget,
  images,
}: TravelDetailCardProps) {
  const startDateTime = new Date(startDate.seconds * 1000);
  const endDateTime = new Date(endDate.seconds * 1000);

  const capitalizedDestination = destination
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const imageSource = images ? images : getRandomImage();

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={imageSource} />
      <View style={styles.infoContainer}>
        <Text style={styles.destination}>{capitalizedDestination}</Text>
        <Text style={styles.date}>
          {dateFormatter(startDateTime, endDateTime)}
        </Text>
        <Text style={styles.details}>
          {findTravelerById(traveler)?.icon + "  "}
          {findTravelerById(traveler)?.title} |{" "}
          {totalDays > 1 ? `${totalDays} days` : "1 day"}
        </Text>
        <Text style={styles.details}>
          {findBudgetById(budget)?.icon + "  "}
          {findBudgetById(budget)?.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    gap: 16,
    margin: 5,
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
  },
  destination: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  date: {
    fontFamily: "outfit-medium",
  },
  details: {
    fontFamily: "outfit",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});
