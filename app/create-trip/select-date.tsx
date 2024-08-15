import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import Header from "@/components/header";
import { Colors } from "@/constants/Colors";
import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";
import moment, { Moment } from "moment";
import { useTrip } from "@/context/TripContext";

export default function SelectDate() {
  const [startDate, setStartDate] = React.useState<Moment | null>(null);
  const [endDate, setEndDate] = React.useState<Moment | null>(null);
  const { trip, setTrip } = useTrip();

  const onDateSelect = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show("Please select start and end date", ToastAndroid.SHORT);
      return;
    }
    const totalNoOfDays = endDate.diff(startDate, "days");
    if (totalNoOfDays < 0) {
      ToastAndroid.show(
        "End date should be greater than start date",
        ToastAndroid.SHORT
      );
      return;
    }
    setTrip({
      ...trip,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      totalDays: totalNoOfDays,
    });
  };

  const onDateChange = (date: Date, type: ChangedDate) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };
  return (
    <View style={styles.container}>
      <Header text="" />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.header}>Travel Dates</Text>
        <CalendarPicker
          allowRangeSelection
          minDate={new Date()}
          maxRangeDuration={30}
          nextTitleStyle={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
            fontSize: 16,
          }}
          previousTitleStyle={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
          }}
          monthTitleStyle={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-semibold",
            fontSize: 16,
          }}
          yearTitleStyle={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-semibold",
          }}
          selectedDayTextStyle={{
            color: Colors.WHITE,
          }}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          textStyle={{
            color: Colors.PRIMARY,
          }}
          onDateChange={onDateChange}
        />
        <TouchableOpacity style={styles.button} onPress={onDateSelect}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  desc: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
    fontSize: 16,
  },
});
