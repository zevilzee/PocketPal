import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  MaterialIcons,
  Entypo,
  AntDesign,
  Ionicons,
  Feather,
} from "react-native-vector-icons";
import Color from "../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const HelpSupport = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containermain}>
        <TouchableOpacity
          onPress={() => navigation.navigate("faq")}
          style={styles.leftContainer}
        >
          <Feather name='help-circle' style={styles.icoMain} />
          <Text style={styles.title}>FAQs</Text>
        </TouchableOpacity>
        <View>
          <MaterialIcons name='keyboard-arrow-right' style={styles.arrowLeft} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containermain}>
        <View style={styles.leftContainer}>
          <AntDesign name='playcircleo' style={styles.icoMain} />
          <Text style={styles.title}>How to use POCKET PAL</Text>
        </View>
        <View>
          <MaterialIcons name='keyboard-arrow-right' style={styles.arrowLeft} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HelpSupport;

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
