import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { dateFormatter } from "@/utils/date-formatter";
import { Colors } from "@/constants/Colors";
import { findTravelerById } from "@/constants/traveler-option";
import { findBudgetById } from "@/constants/budget-option";
import { TripPropsFirebase } from "@/types/trip";

export default function TravelDetailCard({
  destination,
  traveler,
  startDate,
  endDate,
  totalDays,
  budget,
}: TripPropsFirebase) {
  const router = useRouter();
  const startDateTime = new Date(startDate.seconds * 1000);
  const endDateTime = new Date(endDate.seconds * 1000);

  const capitalizedDestination = destination
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <TouchableOpacity
      onPress={() => router.push("/trip-details")}
      style={styles.card}
    >
      <Image
        style={styles.image}
        source={require("../assets/images/login.jpg")}
      />
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
    </TouchableOpacity>
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
  duration: {
    fontFamily: "outfit",
  },
  details: {
    fontFamily: "outfit",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});
