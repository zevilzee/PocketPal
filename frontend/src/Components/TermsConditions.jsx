import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderTitle from "./HeaderTitle";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

const TermsConditions = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle title="TERM & CONDITIONS" />
      <View style={styles.content}>
        <Text style={styles.title}>TERMS AND CONDITIONS OF USE</Text>
        <Text style={styles.subTitle}>
          Pocket Pal App Terms and Conditions These Terms and Conditions
          ("Terms") govern your use of the Pocket Pal App (the "App"), a
          budgeting and financial management application developed by Pocket Pal
          . By accessing or using the App, you agree to comply with these Terms.
          If you do not agree with any part of these Terms, please refrain from
          using the App.
        </Text>
        <Text style={styles.subTitle}>
          1. Acceptance of Terms By using the App, you acknowledge and agree to
          these Terms and any future updates or modifications. Company reserves
          the right to change these Terms at any time without notice. It is your
          responsibility to review these Terms regularly for changes.
        </Text>
        <Text style={styles.subTitle}> 2. Use of the App</Text>
        <Text style={styles.subTitle}>
          2.1. You must be at least 18 years old to use the App.
        </Text>
        <Text style={styles.subTitle}>
          2.2. You agree to provide accurate and up-to-date information during
          the registration process and while using the App.
        </Text>
        <Text style={styles.subTitle}>
          2.3. You are solely responsible for maintaining password.
        </Text>
      </View>
    </View>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    position: "relative",
    bottom: scale(10),
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
  },
  title: {
    fontFamily: "Bold",
    fontSize: scale(18),
    paddingVertical: scale(12),
    width: "75%",
    lineHeight: scale(26),
  },
  subTitle: {
    fontFamily: "Medium",
    fontSize: scale(14),
    lineHeight: scale(21),
    color: Color.SubHeading,
  },
});
