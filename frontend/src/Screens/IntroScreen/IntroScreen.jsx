import React, { useRef } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import { scale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";

const IntroScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx > 100) {
        // Handle the swipe action here (e.g., unlock)
        // You can replace the following alert with your logic.
        alert("Unlocked!");
        // Reset the position of the draggable element
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      } else {
        // If the swipe was not enough, animate back to the initial position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedStyle = {
    transform: [{ translateX: pan.x }],
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#163DA7", "#C66DB4"]} // Gradient colors
        start={{ x: 0.55, y: 0.77 }} // Vertical gradient, start at the top
        end={{ x: 0.11, y: 0.55 }} // Vertical gradient, end at the bottom
        style={styles.gradientBackground}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.unlockText}>Slide to Unlock</Text>
        </View>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.swipeButton, animatedStyle]}
        >
          <Text style={styles.unlockIcon}>→</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBackground: {
    width: "80%",
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  unlockText: {
    fontSize: 16,
    color: "white",
  },
  swipeButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  unlockIcon: {
    fontSize: 24,
    color: "white",
  },
});

export default IntroScreen;
