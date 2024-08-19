import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const onLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Personal Fortress</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.heading}>Hey there, {user?.fullName}!</Text>
        <Text style={styles.description}>
          You’ve successfully unlocked the treasure chest of your account. Your
          email is: {user?.email}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Text style={styles.buttonText}>Time to Say Goodbye!</Text>
        </TouchableOpacity>
      </View>
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
    color: Colors.PRIMARY,
  },
  container2: {
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
    marginHorizontal: 16,
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
