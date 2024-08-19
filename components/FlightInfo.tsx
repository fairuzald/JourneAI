import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import React from "react";
import { Flight } from "@/types/trip";
import { Colors } from "@/constants/Colors";
import {
  formatDateTimeIsoString,
  formatDuration,
} from "@/utils/date-formatter";

export default function FlightInfo({ flightData }: { flightData: Flight[] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Information</Text>
      <View style={styles.flightList}>
        {flightData.map((flight, index) => (
          <View key={index} style={styles.flightItem}>
            <View style={styles.flightHeader}>
              <Text style={styles.airlineInfo}>
                Airline:{" "}
                {flight.airline +
                  "\n" +
                  flight.flightNumber +
                  " | " +
                  formatDuration(flight.departureTime, flight.arrivalTime)}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(flight.bookingUrl)}
                style={styles.bookButton}
              >
                <Text style={styles.bookButtonText}>Book Here</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textInfo}>
              🛬 Arrival : {flight.arrivalAirport} |{" "}
              {formatDateTimeIsoString(flight.arrivalTime)}
            </Text>
            <Text style={styles.textInfo}>
              🛫 Departure: {flight.departureAirport} |{" "}
              {formatDateTimeIsoString(flight.departureTime)}
            </Text>
            <Text style={styles.textInfo}>🔖 Price: {flight.price}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  flightList: {
    flexDirection: "column",
    gap: 16,
  },
  flightItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
  },
  flightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  airlineInfo: {
    fontFamily: "outfit-semibold",
    fontSize: 18,
  },
  bookButton: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  bookButtonText: {
    fontFamily: "outfit-semibold",
    fontSize: 16,
    color: Colors.WHITE,
  },
  textInfo: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
  },
});
