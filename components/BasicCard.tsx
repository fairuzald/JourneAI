import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ReviewLabelType } from "@/constants/review-label";

export default function BasicCard({
  item,
  content,
}: {
  item: ReviewLabelType;
  content?: string;
}) {
  return (
    <View style={[styles.container]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text style={styles.icon}>{item.icon}</Text>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{content}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingVertical: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  description: {
    fontSize: 16,
    fontFamily: "outfit-medium",
  },

  icon: {
    fontSize: 32,
  },
});
