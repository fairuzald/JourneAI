import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function StartNewTrip() {
  return (
    <View style={styles.container}>
      <Ionicons name="location-sharp" size={40} color={Colors.PRIMARY} />
      <Text style={styles.heading}>Start a new trip</Text>
      <Text style={styles.description}>
        Looks like you don't have any trips yet. Start a new trip to get
        started.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start new trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 32,
  },
  description: {
    fontSize: 16,
    color: Colors.GRAY,
    fontFamily: "outfit-medium",
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "outfit-medium",
  },
});
