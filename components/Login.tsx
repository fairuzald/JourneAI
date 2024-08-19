import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.screenContainer}>
      <Image
        source={require("./../assets/images/login.jpg")}
        style={styles.image}
      />

      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to AI Travel Planner!</Text>
        <Text style={styles.description}>
          Ready to uncover the world's best spots? Sign in and let our AI guide
          you to unforgettable adventures!
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/auth/sign-in")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Let’s Go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    height: 500,
    width: "100%",
    resizeMode: "cover",
  },
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    gap: 20,
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  heading: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "outfit",
    color: Colors.GRAY,
    textAlign: "center",
  },
  button: {
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    marginTop: 40,
    width: "100%",
    padding: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-semibold",
  },
});
