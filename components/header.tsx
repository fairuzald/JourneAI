import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Header({ text }: { text: string }) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={Colors.PRIMARY} />
      </TouchableOpacity>
      <Text style={styles.heading}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.WHITE,
    gap: 18,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    color: Colors.PRIMARY,
    fontFamily: "outfit-semibold",
  },
  description: {
    fontSize: 16,
    color: Colors.GRAY,
    fontFamily: "outfit-medium",
  },
});
