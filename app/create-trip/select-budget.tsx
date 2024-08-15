import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SelectBudgetList } from "@/constants/budget-option";
import OptionCard from "@/components/OptionCard";
import { Colors } from "@/constants/Colors";
import Header from "@/components/header";
import { useTrip } from "@/context/TripContext";
import { useRouter } from "expo-router";

export default function SelectBudget() {
  const [selectedId, setSelectedId] = React.useState(0);
  const { trip, setTrip } = useTrip();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header text="" />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.header}>Who's Travelling</Text>
        <Text style={styles.desc}>Choose your traveles</Text>
        <FlatList
          data={SelectBudgetList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedId(item.id);
              }}
            >
              <OptionCard option={item} selectedId={selectedId} />
            </TouchableOpacity>
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
            setTrip({
              ...trip,
              budget: selectedId,
            });
            router.push("/create-trip/select-date");
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
