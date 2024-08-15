import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";
import Header from "@/components/header";
import { useTrip } from "@/context/TripContext";
import { useRouter } from "expo-router";
import BasicCard from "@/components/BasicCard";
import { ReviewLabel } from "@/constants/review-label";
import SelectTraveler from "./select-traveler";
import { SelectTravelerList } from "@/constants/traveler-option";
import { SelectBudgetList } from "@/constants/budget-option";

export default function SelectBudget() {
  const { trip } = useTrip();
  const router = useRouter();

  // Function to get the corresponding content based on the title
  const getContent = (id: number): string | undefined => {
    switch (id) {
      case 1:
        return trip.destination;
      case 2:
        return `${trip.startDate?.toLocaleDateString()} - ${trip.endDate?.toLocaleDateString()} (${
          trip.totalDays
        } ${trip.totalDays && trip.totalDays > 1 ? "days" : "day"})`;
      case 3:
        return SelectTravelerList.filter((item) => item.id === trip.traveler)[0]
          .title;
      case 4:
        return SelectBudgetList.filter((item) => item.id === trip.budget)[0]
          .title;
      default:
        return undefined;
    }
  };

  return (
    <View style={styles.container}>
      <Header text="" />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.header}>Review your trip</Text>
        <Text style={styles.desc}>
          Please review your trip details before proceeding
        </Text>
        <FlatList
          data={ReviewLabel}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BasicCard item={item} content={getContent(item.id)} />
          )}
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "center",
            gap: 14,
            marginTop: 20,
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/create-trip/review-trip");
          }}
        >
          <Text style={styles.buttonText}>Build My Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  desc: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
    fontSize: 16,
  },
});
