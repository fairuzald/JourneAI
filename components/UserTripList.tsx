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

export default function UserTripList({ data }: { data: UserTripData[] }) {
  if (!data || data.length === 0) {
    return <Text>No data</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tripContainer}>
        <Image
          source={require("../assets/images/login.jpg")}
          style={styles.image}
        />
        <View style={styles.tripInfoContainer}>
          <Text style={styles.bigDestination}>
            {data[0].tripData.destination}
          </Text>
          <View style={styles.tripDetails}>
            <Text>
              {dateFormatter(
                new Date(data[0].tripData.startDate.seconds * 1000),
                new Date(data[0].tripData.endDate.seconds * 1000)
              )}
            </Text>
            <Text>
              {findTravelerById(data[0].tripData.traveler)?.icon}
              {findTravelerById(data[0].tripData.traveler)?.title}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>See your plans</Text>
        </TouchableOpacity>
        {data.slice(1).map((trip, index) => (
          <TravelDetailCard key={index} {...trip.tripData} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tripContainer: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  tripInfoContainer: {
    marginVertical: 10,
  },
  bigDestination: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  tripDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
