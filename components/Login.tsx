import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Image
        source={require("./../assets/images/login.jpg")}
        style={{
          height: 500,
          objectFit: "cover",
          width: "100%",
        }}
      />

      <View style={styles.container}>
        <Text
          style={{
            fontSize: 28,
            fontFamily: "outfit-bold",
            color: Colors.PRIMARY,
            textAlign: "center",
          }}
        >
          AI Travel Planner
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit",
            color: Colors.GRAY,
            textAlign: "center",
          }}
        >
          Discover the best places in the world with AI for better travel
          experience. Sign in to get started.
        </Text>

        <TouchableOpacity
          onPress={() => {
            router.push("/auth/sign-in");
          }}
          style={{
            borderRadius: 50,
            backgroundColor: Colors.PRIMARY,
            marginTop: 40,
            width: "100%",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit-semibold",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
