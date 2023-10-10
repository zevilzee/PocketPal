import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

const BottomTab = ({ title, image, onpress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onpress}>
      <LinearGradient
        colors={["#163DA7", "#C66DB4"]}
        start={{ x: 0.55, y: 0.77 }}
        end={{ x: 0.11, y: 0.55 }}
        style={styles.gradientBackground}
      >
        {image !== undefined && <Image source={image} style={styles.image} />}
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    width: scale(217),
    alignSelf: "center",
    paddingVertical: scale(10),
  },
  gradientBackground: {
    paddingVertical: scale(11),
    alignItems: "center",
    borderRadius: scale(40),
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontFamily: "Regular",
    color: Color.White,
  },
  image: {
    width: scale(15),
    height: scale(15),
    resizeMode: "contain",
  },
});
