import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderTitle from "./HeaderTitle";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle title="PRIVACY POLICY" />
      <View style={styles.content}>
        <Text style={styles.title}>PRIVACY POLICY</Text>
        <Text style={styles.subTitle}>
          Privacy is of utmost importance to us. This Privacy Policy outlines
          how we collect, use, disclose, and safeguard your personal
          information. We may collect data when you interact with our website or
          services, such as your name, contact information, and browsing
          activity. This information is used solely for improving our services,
          providing personalized experiences, and ensuring the security of your
          data. We do not share your personal information with third parties
          unless required by law or with your explicit consent. Our commitment
          is to protect your privacy and maintain the confidentiality of your
          data. If you have any questions or concerns about our privacy
          practices, please reach out to us through our contact information
          provided in this policy. Your trust is essential to us, and we are
          dedicated to maintaining the highest standards of data protection.
        </Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

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
  },
  subTitle: {
    fontFamily: "Medium",
    fontSize: scale(14),
    lineHeight: scale(21),
    color: Color.SubHeading,
  },
});
