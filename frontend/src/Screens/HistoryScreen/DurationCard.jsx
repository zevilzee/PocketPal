import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import { AntDesign } from "react-native-vector-icons";

const DurationCard = ({ modal, selectedItem }) => {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Select History Duration</Text>
        </View>
        <TouchableOpacity
          style={styles.durationTime}
          onPress={() => modal(true)}
        >
          <Text style={styles.time}>{selectedItem}</Text>
          <AntDesign name="down" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DurationCard;
const styles = StyleSheet.create({
  card: {
    width: scale(321),
    backgroundColor: Color.White,
    borderRadius: scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scale(21),
    elevation: 3,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
  },
  title: {
    fontSize: scale(14),
    fontFamily: "Medium",
  },

  icon: {
    fontSize: scale(17),
    color: "#FF5E5E",
    paddingVertical: scale(2),
  },
  durationTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  time: {
    fontFamily: "Regular",
    fontSize: scale(12),
    color: "#FF5E5E",
  },
});
