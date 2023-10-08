import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

import { Ionicons } from "react-native-vector-icons";
const HeaderTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name="chevron-back" style={styles.icon} />
      </View>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Blue,
    height: scale(80),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontFamily: "Bold",
    color: Color.White,
    fontSize: scale(18),
    textTransform: "uppercase",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    position: "absolute",
    left: scale(-115),
    fontSize: scale(22),
    color: Color.White,
  },
});
