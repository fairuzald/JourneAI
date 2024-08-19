import {
  StyleSheet,
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
    <View style={styles.container}>
      {router.canGoBack() && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Let's Sign You In!</Text>
      <Text style={styles.subtitle}>We've been waiting for you!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/auth/sign-up")}
      >
        <Text style={styles.buttonTextSecondary}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 25,
    flexDirection: "column",
    gap: 20,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "outfit",
    color: Colors.GRAY,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: "outfit",
    color: Colors.PRIMARY,
  },
  input: {
    borderColor: Colors.GRAY,
    borderWidth: 1.5,
    borderRadius: 10,
    fontFamily: "outfit",
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Colors.PRIMARY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 50,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-semibold",
  },
  secondaryButton: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY,
    borderWidth: 1.5,
  },
  buttonTextSecondary: {
    color: Colors.PRIMARY,
    textAlign: "center",
    fontFamily: "outfit-semibold",
  },
});
