import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { signIn } = useAuth();

  const onRegister = async () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
      });

      // Generate a token (you may want to use a proper JWT library)
      const token = user.uid;

      // Save user data and token using the useAuth hook
      await signIn({ id: user.uid, email, fullName }, token);

      ToastAndroid.show("Account created successfully", ToastAndroid.SHORT);
      router.push("/auth/sign-in");
    } catch (error: any) {
      console.error(error);
      ToastAndroid.show(
        error.message || "Something went wrong",
        ToastAndroid.LONG
      );
    }
  };

  return (
    <View style={styles.container}>
      {router.canGoBack() && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Join the Adventure!</Text>
      <Text style={styles.subtitle}>Create your new account below:</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Full Name"
          onChangeText={(text) => setFullName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>Create My Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/auth/sign-in")}
      >
        <Text style={styles.buttonTextSecondary}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    flexDirection: "column",
    gap: 20,
    backgroundColor: Colors.WHITE,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "outfit",
    color: Colors.GRAY,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
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
