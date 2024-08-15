import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import StartNewTrip from "@/components/StartNewTrip";
import { Colors } from "@/constants/Colors";
import { auth } from "@/configs/FirebaseConfig";
import { useAuth } from "@/hooks/useAuth";

export default function Mytrip() {
  const [trips, setTrips] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Mytrip</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="add" size={28} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>

      {!trips || trips.length === 0 ? <StartNewTrip /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 36,
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    fontFamily: "outfit-bold",
  },
  headerButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    padding: 4,
  },
});
