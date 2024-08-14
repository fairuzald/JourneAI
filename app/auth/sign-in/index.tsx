import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const onLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (!userData) {
        throw new Error("User data not found");
      }

      // Generate a token (you may want to use a proper JWT library)
      const token = user.uid; // This is a simplification. In a real app, use a proper token

      // Save user data and token using the useAuth hook
      await signIn(
        {
          id: user.uid,
          email: user.email || "",
          fullName: userData.fullName || "",
        },
        token
      );

      console.log("User signed in:", user.uid);
      ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT);
      router.push("/mytrip");
    } catch (error: any) {
      console.error("Login error:", error);
      ToastAndroid.show(
        error.message || "Something went wrong",
        ToastAndroid.LONG
      );
    }
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        flexDirection: "column",
        gap: 20,
        backgroundColor: Colors.WHITE,
      }}
    >
      {router.canGoBack() && (
        <TouchableOpacity>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.PRIMARY}
            onPress={() => {
              router.back();
            }}
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: 28,
          fontFamily: "outfit-bold",
          color: Colors.PRIMARY,
        }}
      >
        Let's Sign You In
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontFamily: "outfit",
          color: Colors.GRAY,
        }}
      >
        Let's Sign You In
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontFamily: "outfit",
          color: Colors.GRAY,
        }}
      >
        You've been missed!
      </Text>

      <View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit",
            color: Colors.PRIMARY,
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            borderColor: Colors.GRAY,
            borderWidth: 1.5,
            borderRadius: 10,
            fontFamily: "outfit",
            paddingHorizontal: 15,
            paddingVertical: 10,
            color: Colors.PRIMARY,
          }}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit",
            color: Colors.PRIMARY,
          }}
        >
          Password
        </Text>
        <TextInput
          secureTextEntry
          style={{
            borderColor: Colors.GRAY,
            borderWidth: 1.5,
            borderRadius: 10,
            fontFamily: "outfit",
            paddingHorizontal: 15,
            paddingVertical: 10,
            color: Colors.PRIMARY,
          }}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 12,
          borderRadius: 50,
        }}
        onPress={onLogin}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "outfit-semibold",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.WHITE,
          padding: 12,
          borderRadius: 50,
          borderColor: Colors.PRIMARY,
          borderWidth: 1.5,
        }}
        onPress={() => {
          router.push("/auth/sign-up");
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontFamily: "outfit-semibold",
          }}
        >
          Create an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}
