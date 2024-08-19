import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { DailyItinerary } from "@/types/trip";
import { Colors } from "@/constants/Colors";
import { getRandomImageArray } from "@/utils/travel-images";

export default function ItineraryInfo({
  itenaryData,
}: {
  itenaryData: DailyItinerary[];
}) {
  const images = getRandomImageArray(itenaryData.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan Information</Text>
      <View style={styles.column}>
        {itenaryData.map((itenary, index) => (
          <View key={index} style={styles.itenaryContainer}>
            <Text style={styles.itenaryTitle}>{itenary.title}</Text>
            <View style={styles.scheduleContainer}>
              {itenary.schedule.map((schedule, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <Image
                    source={images[index]}
                    style={styles.scheduleImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.location}>{schedule.location}</Text>
                  <Text style={styles.common}>{schedule.activity}</Text>
                  <Text style={styles.common}>
                    {schedule.details
                      ? schedule.details
                      : "Free to do whatever you want"}
                  </Text>
                  <Text style={styles.common}>
                    🎟️ Ticket Price: {schedule.price ? schedule.price : "Free"}
                  </Text>
                  <Text style={styles.common}>
                    ⏱️ Time on Location: {schedule.time}
                  </Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => Linking.openURL(schedule.googleMapUrl)}
                  >
                    <Text style={styles.detailsButtonText}>See on Maps</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
  column: {
    flexDirection: "column",
    gap: 10,
  },
  itenaryContainer: {
    flexDirection: "column",
    gap: 10,
  },
  itenaryTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    marginTop: 16,
  },
  scheduleContainer: {
    flexDirection: "column",
    gap: 20,
  },
  scheduleItem: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    gap: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scheduleImage: {
    width: "100%",
    height: 170,
    borderRadius: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
  common: {
    fontSize: 16,
    fontFamily: "outfit",
  },
  detailsButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  detailsButtonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
});
