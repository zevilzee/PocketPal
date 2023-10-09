import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import { scale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import Color from "../../../assets/colors/Color";
import { useNavigation } from "@react-navigation/native";

const IntroScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const navigation = useNavigation();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx > 150) {
        navigation.navigate("LoginOrSignUp");
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      } else {
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
      <View style={styles.contentContainer}>
        <View style={{ paddingVertical: scale(20) }}>
          <Image
            source={require("../../../assets/IntroImg.png")}
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.title}>Take Control of Your Finances Today!</Text>
          <Text style={styles.subTitle}>
            With our app, you can easily track your income and expenses, set
            financial goals, and make informed decisions about your money.
          </Text>
        </View>

        <View style={styles.swipeContainer}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.swipeButton, animatedStyle]}
          >
            <LinearGradient
              colors={["#163DA7", "#C66DB4"]}
              start={{ x: 0.55, y: 0.77 }}
              end={{ x: 0.11, y: 0.55 }}
              style={styles.gradientBackground}
            >
              <MaterialCommunityIcons
                name="arrow-right"
                style={{ ...styles.unlockIcon, color: Color.White }}
              />
            </LinearGradient>

            <Text>Get Started</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              style={styles.swipIcon}
            />
            <MaterialIcons
              name="keyboard-arrow-right"
              style={styles.swipIcon}
            />
            <MaterialIcons
              name="keyboard-arrow-right"
              style={styles.swipIcon}
            />
          </Animated.View>
          <View style={styles.unlock}>
            <MaterialCommunityIcons
              name="lock-open"
              style={styles.unlockIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.White,
  },
  contentContainer: {
    width: scale(300),
    alignItems: "center",
  },
  image: {
    width: scale(250),
    height: scale(250),
    resizeMode: "contain",
    paddingVertical: scale(30),
  },
  title: {
    fontFamily: "Bold",
    fontSize: scale(23),
  },
  subTitle: {
    fontFamily: "Regular",
    paddingVertical: scale(15),
  },
  gradientBackground: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  swipeContainer: {
    width: scale(300),
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scale(20),
    backgroundColor: "#DFDFDF",
    overflow: "hidden",
    flexDirection: "row",
    borderRadius: scale(20),
  },
  swipeButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  unlockIcon: {
    fontSize: 24,
    color: "white",
  },
  getStartedText: {
    color: "#163DA7",
    marginLeft: scale(10),
    fontSize: scale(18),
  },
  swipIcon: {
    fontSize: scale(20),
  },
  unlock: {
    backgroundColor: Color.White,
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    alignItems: "center",
    justifyContent: "center",
  },
  unlockIcon: {
    color: Color.Blue,
    fontSize: scale(30),
  },
});

export default IntroScreen;
