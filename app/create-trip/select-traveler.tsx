import { View, Text, FlatList } from "react-native";
import React from "react";
import { SelectTravelerList } from "@/constants/options";

export default function SelectTraveler() {
  return (
    <View>
      <Text>SelectTraveler</Text>
      <FlatList
        data={SelectTravelerList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "outfit-medium",
                color: "black",
              }}
            >
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
