import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

const Header = () => {
  return (
    <Pressable>
      <MaterialIcons name="keyboard-arrow-left" style={styles.swipIcon} />
    </Pressable>
  );
};

export default Header;

const styles = StyleSheet.create({
  swipIcon: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    fontSize: scale(30),
    color: Color.White,
  },
});
