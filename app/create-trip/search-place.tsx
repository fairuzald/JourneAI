import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
  const { setTripSearch } = useTrip();
  const onSearch = () => {
    setTripSearch(search);
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
});
