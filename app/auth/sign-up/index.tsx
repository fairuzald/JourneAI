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
        Create New Account
      </Text>

      <View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit",
            color: Colors.PRIMARY,
          }}
        >
          Full Name
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
          placeholder="Enter your Full Name"
          onChangeText={(text) => setFullName(text)}
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
        onPress={onRegister}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "outfit-semibold",
          }}
        >
          Create an account
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
          router.push("/auth/sign-in");
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontFamily: "outfit-semibold",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
