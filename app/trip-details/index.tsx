import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { UserTripData } from "@/types/trip";
import { Colors } from "@/constants/Colors";
import { dateFormatter } from "@/utils/date-formatter";
import { findTravelerById } from "@/constants/traveler-option";
import { findBudgetById } from "@/constants/budget-option";
import FlightInfo from "@/components/FlightInfo";
import HotelInfo from "@/components/HotelInfo";
import ItenaryInfo from "@/components/ItenaryInfo";
import { capitalize, getDaySuffix } from "@/utils/word-formatter";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default function TripDetailsScreen() {
  const { trip, image } = useLocalSearchParams();
  const [tripData, setTripData] = React.useState<UserTripData | null>(null);
  const [imageData, setImageData] = React.useState<any>(null);

  React.useEffect(() => {
    if (!trip || Array.isArray(trip)) return;

    try {
      const parsedTrip = JSON.parse(trip);
      setTripData(parsedTrip);
      setImageData(image);
    } catch (error) {
      console.error("Failed to parse trip data:", error);
    }
  }, [trip]);

  if (!tripData) {
    return <Text>No trip data</Text>;
  }

  const startDate = new Date(tripData.tripData.startDate.seconds * 1000);
  const endDate = new Date(tripData.tripData.endDate.seconds * 1000);

  const onDelete = async () => {
    if (!tripData) return;

    try {
      const tripRef = doc(db, "trips", tripData.id);
      await deleteDoc(tripRef);
      ToastAndroid.show("Trip deleted successfully", ToastAndroid.SHORT);
      router.push("/mytrip");
    } catch (error) {
      console.error("Error removing trip: ", error);
      ToastAndroid.show("Failed to delete trip", ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      <Image source={imageData} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.destination}>
            {capitalize(tripData.tripData.destination)}
          </Text>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <EvilIcons
              name="trash"
              size={24}
              style={styles.deleteIcon}
              color="red"
            />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>
          📅 {"  " + dateFormatter(startDate, endDate)}{" "}
          {"(" +
            tripData.tripData.totalDays +
            " " +
            getDaySuffix(tripData.tripData.totalDays) +
            ")"}
        </Text>
        <Text style={styles.infoText}>
          {findTravelerById(tripData.tripData.traveler)?.icon} {"  "}
          {findTravelerById(tripData.tripData.traveler)?.title} {"  |  "}
          {findBudgetById(tripData.tripData.budget)?.icon} {"  "}
          {findBudgetById(tripData.tripData.budget)?.title}
        </Text>

        {/* Flight */}
        <FlightInfo flightData={tripData.tripDetails.flights} />

        {/* Hotels */}
        <HotelInfo hotelData={tripData.tripDetails.hotels} />

        {/* Itenary day */}
        <ItenaryInfo itenaryData={tripData.tripDetails.dailyItinerary} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "column",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
  },
  container: {
    backgroundColor: Colors.WHITE,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    flex: 1,
    marginTop: -30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  destination: {
    fontFamily: "outfit-bold",
    fontSize: 28,
  },
  deleteButton: {
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 1,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    marginTop: -4,
  },
  deleteText: {
    fontFamily: "outfit-bold",
    fontSize: 16,
    color: "red",
  },
  dateText: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.GRAY,
  },
  infoText: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.GRAY,
  },
});
