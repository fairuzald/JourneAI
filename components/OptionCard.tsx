import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SelectTravelerType } from "@/constants/traveler-option";
import { Colors } from "@/constants/Colors";

export default function OptionCard({
  option,
  selectedId,
}: {
  option: SelectTravelerType;
  selectedId: number;
}) {
  return (
    <View
      style={[
        styles.container,
        selectedId === option.id ? styles.selected : {},
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={styles.title}>{option.title}</Text>
          <Text style={styles.description}>{option.description}</Text>
        </View>

        <Text style={styles.icon}>{option.icon}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 18,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  description: {
    fontSize: 16,
    fontFamily: "outfit-medium",
    color: Colors.GRAY,
  },
  selected: {
    borderWidth: 2.5,
    borderColor: Colors.PRIMARY,
  },
  icon: {
    fontSize: 32,
  },
});
