import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { AntDesign } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Color from "../../assets/colors/Color";

const SaveingPlanBalance = ({ totalValue, loading }) => {
  return (
    <View>
      <LinearGradient
        colors={["#2842A9", "#C66DB4"]}
        start={{ x: 0.46, y: 0.77 }}
        end={{ x: 0.11, y: 0.55 }}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <Image
            source={require("../../assets/circle.png")}
            style={styles.circle}
          />
          <View style={styles.centerContainer}>
            <Text style={styles.title}>Personal Saving plan</Text>
            <Text style={styles.subTitle}>Target Saving</Text>
            {!loading && <Text style={styles.balance}>${totalValue}</Text>}
          </View>
          <Image
            source={require("../../assets/half.png")}
            style={{
              ...styles.circle,
              top: scale(30),
              height: scale(80),
              right: scale(-30),
            }}
          />

          <Image
            source={require("../../assets/cut.png")}
            style={{
              ...styles.circle,
              top: scale(0),
              height: scale(50),
              left: scale(-55),
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default SaveingPlanBalance;
const styles = StyleSheet.create({
  container: {
    width: scale(310),
    alignSelf: "center",
    height: scale(110),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    borderRadius: scale(10),
    objectFit: "cover",
    overflow: "hidden",
  },
  imageBg: {
    width: scale(310),
    height: scale(180),
    resizeMode: "cover",
    alignSelf: "center",
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  contentContainer: {
    justifyContent: "space-evenly",
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
    gap: scale(8),
    alignItems: "center",
    width: "100%",
  },
  total: {
    color: Color.White,
    fontFamily: "Medium",
    fontSize: scale(14),
  },
  amount: {
    color: Color.White,
    fontFamily: "Bold",
    fontSize: scale(28),
    paddingVertical: scale(3),
  },
  spent: {
    color: Color.White,
    fontFamily: "Medium",
    fontSize: scale(12),
  },
  amountSpend: {
    color: Color.White,
    fontFamily: "Bold",
    fontSize: scale(20),
  },
  chip: {
    position: "absolute",
    right: scale(-80),
    width: scale(50),
    height: scale(50),
    resizeMode: "contain",
    top: scale(15),
  },
  circle: {
    position: "absolute",
    right: scale(-20),
    width: scale(120),
    height: scale(120),
    resizeMode: "contain",
    top: scale(60),
  },
  centerContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Bold",
    fontSize: scale(18),
    color: Color.White,
    paddingVertical: scale(3),
  },
  subTitle: {
    fontFamily: "Medium",
    fontSize: scale(16),
    paddingVertical: scale(5),
    color: Color.White,
  },
  balance: {
    fontFamily: "Bold",
    fontSize: scale(24),
    color: Color.White,
  },
});
