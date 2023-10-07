import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { Entypo } from "react-native-vector-icons";

const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <Entypo name="dots-three-horizontal" style={styles.icon} />
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Blue,
    height: scale(80),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    width: scale(70),
    height: scale(70),
    resizeMode: "contain",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    position: "absolute",
    right: scale(-115),
    fontSize: scale(22),
    color: Color.White,
  },
});
