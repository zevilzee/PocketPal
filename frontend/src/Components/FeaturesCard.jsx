import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

const FeaturesCard = ({ title, image, style, onpress }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: style }}
      onPress={onpress}
    >
      <Image source={image} style={styles.img} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FeaturesCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    width: scale(95),
    height: scale(83),
    alignItems: "center",
    justifyContent: "center",
    gap: scale(6),
    borderRadius: scale(10),
    elevation: 4,
    shadowColor: Color.Black,
  },
  title: {
    fontFamily: "Medium",
    color: Color.Black,
    fontSize: scale(10),
  },
  img: {
    width: scale(30),
    height: scale(30),
    resizeMode: "contain",
  },
});
