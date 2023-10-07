import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderHome from "./HeaderHome";
import NameHeader from "./NameHeader";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import ATMCard from "./ATMCard";

import FeatureCardsHome from "./FeatureCardsHome";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderHome />
      <View style={styles.mainContainer}>
        <NameHeader />
        <ATMCard />
        <Text style={styles.title}>Features</Text>
        <FeatureCardsHome />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: Color.White,
    height: "100%",
    borderTopRightRadius: scale(12),
    borderTopLeftRadius: scale(12),
    position: "relative",
    top: scale(-15),
  },
  title: {
    fontFamily: "Bold",
    paddingVertical: scale(10),
    left: scale(30),
    fontSize: scale(16),
  },
});
