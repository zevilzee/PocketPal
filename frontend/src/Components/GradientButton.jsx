import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

const GradientButton = ({ title, onPress, containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, containerStyle]}
    >
      <LinearGradient
        colors={["#163DA7", "#C66DB4"]}
        start={{ x: 0.55, y: 0.77 }}
        end={{ x: 0.11, y: 0.55 }}
        style={styles.gradientBackground}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: scale(20),
  },
  gradientBackground: {
    borderRadius: scale(20),
  },
  buttonText: {
    color: Color.White,
    fontSize: scale(16),
    textAlign: "center",
    padding: scale(12),
    fontFamily: "Medium",
  },
});

export default GradientButton;
