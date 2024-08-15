import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { queryAi } from "@/utils/ai-query";
import { useTrip } from "@/context/TripContext";
import { SelectBudgetList } from "@/constants/budget-option";
import { SelectTravelerList } from "@/constants/traveler-option";
import { chatSession } from "@/configs/AiModel";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/configs/FirebaseConfig";
import { useRouter } from "expo-router";

export default function GenerateTrip() {
  const { trip } = useTrip();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setShouldGenerate(true);
    }
  }, [user]);

  useEffect(() => {
    if (shouldGenerate) {
      onGenerate();
    }
  }, [shouldGenerate]);

  const onGenerate = async () => {
    if (!user) {
      setError("User not found. Please log in and try again.");
      setLoading(false);
      return;
    }
    try {
      const query = queryAi(
        trip.totalDays,
        SelectTravelerList.find((item) => item.id === trip.traveler)?.title,
        trip.destination,
        trip.startDate?.toISOString(),
        trip.endDate?.toISOString(),
        SelectBudgetList.find((item) => item.id === trip.budget)?.title
      );

      const res = await chatSession.sendMessage(query);
      const data = res.response.text();
      const jsonParsed = JSON.parse(data);
      const docId = Date.now().toString();

      await setDoc(doc(db, "trips", docId), {
        userEmail: user.email,
        tripDetails: jsonParsed,
        tripData: trip,
      });

      router.push("/(tabs)/mytrip");
    } catch (e) {
      console.error(e);
      setError("Error in saving trip details. Please try again.");
    } finally {
      setLoading(false);
      setShouldGenerate(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Generate your trip</Text>
      <Text style={styles.subHeading}>Get your trip details</Text>
      <Image
        source={require("../../assets/images/loading.png")}
        style={styles.image}
      />
      {loading ? (
        <Text style={styles.paragraph}>
          Your trip is being generated. This may take a few seconds.
        </Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}. Please try again later.</Text>
      ) : (
        <Text style={styles.paragraph}>Your trip has been generated!</Text>
      )}
      <Text style={styles.subHeading}>
        {loading ? "Loading..." : error ? "Error" : "Generated"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 40,
    paddingVertical: 80,
    gap: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 18,
    fontFamily: "outfit",
    color: Colors.GRAY,
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    objectFit: "contain",
  },
  errorText: {
    fontSize: 18,
    fontFamily: "outfit",
    color: "red",
    textAlign: "center",
  },
});
