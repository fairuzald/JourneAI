import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import StartNewTrip from "@/components/StartNewTrip";
import { Colors } from "@/constants/Colors";
import { db } from "@/configs/FirebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripList from "@/components/UserTripList";
import { useRouter } from "expo-router";
import { UserTripData } from "@/types/trip";

export default function Mytrip() {
  const [userTrips, setUserTrips] = useState<UserTripData[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getMyTrips();
    }
  }, [user]);

  const getMyTrips = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "trips"),
        where("userEmail", "==", user?.email)
      );

      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        setUserTrips((prev) => [...prev, doc.data()] as UserTripData[]);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Mytrip</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.push("/create-trip/search-place")}
        >
          <Ionicons name="add" size={28} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>{userTrips.length} Trips</Text>
      )}
      {!userTrips || userTrips.length === 0 ? (
        <StartNewTrip />
      ) : (
        <UserTripList data={userTrips} />
      )}
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
  },
  headerButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    padding: 4,
  },
});
