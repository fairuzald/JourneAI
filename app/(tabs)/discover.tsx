import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import StartNewTrip from "@/components/StartNewTrip";
import { Colors } from "@/constants/Colors";
import { db } from "@/configs/FirebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import UserTripList from "@/components/UserTripList";
import { useRouter } from "expo-router";
import { UserTripData } from "@/types/trip";
import EmptyHistory from "@/components/EmptyHistory";

export default function Discover() {
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
      const today = Timestamp.fromDate(new Date());
      const q = query(
        collection(db, "trips"),
        where("userEmail", "==", user?.email)
      );

      const querySnap = await getDocs(q);
      const trips: UserTripData[] = [];
      querySnap.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() } as UserTripData;
        if (data.tripData.endDate.seconds < Timestamp.now().seconds) {
          trips.push(data);
        }
      });
      setUserTrips(trips);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Discover</Text>
      </View>

      {loading ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 16,
            flex: 1,
            fontFamily: "outfit-bold",
          }}
        >
          Loading
        </Text>
      ) : !userTrips || userTrips.length === 0 ? (
        <EmptyHistory />
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
