import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/header";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useTrip } from "@/context/TripContext";

export default function SearchPlace() {
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const { trip, setTrip } = useTrip();
  const onSearch = () => {
    if (!search) {
      ToastAndroid.show("Please enter a destination", ToastAndroid.SHORT);
      return;
    }
    setTrip({
      ...trip,
      destination: search,
    });
    router.push("/create-trip/select-traveler");
  };

  return (
    <View style={styles.container}>
      <Header text="Search" />
      <View>
        <TextInput
          placeholder="Search for a place"
          style={styles.input}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            padding: 10,
          }}
          onPress={onSearch}
        >
          <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Ionicons name="location-sharp" size={40} color={Colors.PRIMARY} />
        <Text style={styles.heading}>Search you trip place</Text>
        <Text style={styles.description}>
          Search for a place to start your trip and explore the world with us.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onSearch}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    backgroundColor: Colors.WHITE,
    paddingTop: 24,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  input: {
    borderColor: Colors.GRAY,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "outfit",
    color: Colors.PRIMARY,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
  },
  description: {
    fontSize: 16,
    color: Colors.GRAY,
    fontFamily: "outfit-medium",
    textAlign: "center",
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
