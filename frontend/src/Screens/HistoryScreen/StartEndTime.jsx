import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import { FontAwesome } from "react-native-vector-icons";

const StartEndTime = () => {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <FontAwesome name="calendar" style={styles.icon} />
        <View style={styles.row}>
          <Text style={styles.subTitle}>Start date</Text>
        </View>
      </View>
      <View style={styles.line}></View>

      <View style={styles.container}>
        <FontAwesome name="calendar" style={styles.icon} />

        <View style={styles.row}>
          <Text style={styles.subTitle}>Ending date</Text>
        </View>
      </View>
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
