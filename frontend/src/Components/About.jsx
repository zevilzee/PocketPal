import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  MaterialIcons,
  Entypo,
  AntDesign,
  Ionicons,
  Foundation,
} from "react-native-vector-icons";
import Color from "../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const About = () => {
  const navigation = useNavigation();
  const handlePrivacy = () => {
    navigation.navigate("PrivacyPolicy");
  };

  const handleTermsCondition = () => {
    navigation.navigate("TermsCondition");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containermain} onPress={handlePrivacy}>
        <View style={styles.leftContainer}>
          <Foundation name="clipboard-notes" style={styles.icoMain} />
          <Text style={styles.title}>Privacy Policy</Text>
        </View>
        <View>
          <MaterialIcons name="keyboard-arrow-right" style={styles.arrowLeft} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.containermain}
        onPress={handleTermsCondition}
      >
        <View style={styles.leftContainer}>
          <Foundation name="clipboard-notes" style={styles.icoMain} />
          <Text style={styles.title}>Terms & Conditions</Text>
        </View>
        <View>
          <MaterialIcons name="keyboard-arrow-right" style={styles.arrowLeft} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.containermain, borderBottomWidth: 0 }}
      >
        <View style={styles.leftContainer}>
          <AntDesign name="sharealt" style={styles.icoMain} />
          <Text style={styles.title}>Share POCKETPAL</Text>
        </View>
        <View>
          <MaterialIcons name="keyboard-arrow-right" style={styles.arrowLeft} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Color.White,
  },

  containermain: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: scale(12),
    paddingHorizontal: scale(18),
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  arrowLeft: {
    fontSize: scale(22),
  },
  title: { fontFamily: "Medium", fontSize: scale(14) },
  icoMain: {
    fontSize: scale(19),
    color: Color.Blue,
  },
});
