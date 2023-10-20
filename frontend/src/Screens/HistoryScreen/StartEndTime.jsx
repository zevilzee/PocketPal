import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import { FontAwesome } from "react-native-vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const StartEndTime = ({ date, setDate, setEndTime, endTime }) => {
  // Date and time picker state variables
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [showDatePick, setshowDatePick] = useState(false);

  const showDatePicker = () => {
    setshowDatePick(true);
  };

  const hideDatePick = () => {
    setshowDatePick(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    hideDatePick();
  };

  const handleTimeSelect = (event, selectedDate) => {
    const currentDate = selectedDate || endTime;
    setEndTime(currentDate);
    hideTimePicker();
  };

  const formatSelectedDate = (selectedDate) => {
    if (selectedDate instanceof Date) {
      return selectedDate.toLocaleDateString(); // You can customize the format by passing options to toLocaleDateString
    }
    return ""; // Handle invalid date or other cases
  };

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <FontAwesome name="calendar" style={styles.icon} />
        <Pressable onPress={showDatePicker} style={styles.row}>
          <Text style={styles.subTitle}>{formatSelectedDate(date)}</Text>
        </Pressable>
      </View>
      <View style={styles.line}></View>

      <View style={styles.container}>
        <FontAwesome name="calendar" style={styles.icon} />
        <Pressable style={styles.row} onPress={showTimePicker}>
          <Text style={styles.subTitle}>{formatSelectedDate(endTime)}</Text>
        </Pressable>
      </View>

      {showDatePick && (
        <DateTimePicker
          value={date}
          mode="date"
          // display="default"
          onChange={handleDate}
        />
      )}

      {isTimePickerVisible && (
        <DateTimePicker
          value={endTime}
          mode="date"
          is24Hour={false}
          // display="default"
          onChange={handleTimeSelect}
        />
      )}
    </View>
  );
};

export default StartEndTime;

const styles = StyleSheet.create({
  card: {
    width: scale(321),
    backgroundColor: Color.White,
    borderRadius: scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scale(12),
    elevation: 3,
    marginVertical: scale(14),
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(10),
  },
  title: {
    fontSize: scale(18),
    fontFamily: "Bold",
    color: Color.Blue,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: scale(1),
    height: scale(35),
    backgroundColor: "#828282",
  },
  subTitle: {
    fontSize: scale(12),
    fontFamily: "Medium",
    color: Color.Black,
  },
  icon: {
    fontSize: scale(16),
    color: Color.Blue,
    paddingVertical: scale(2),
  },
});
