import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
const HeaderTitle = ({ title }) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable onPress={handleBack} style={styles.icon}>
        <Ionicons name="chevron-back" style={styles.iconBack} />
      </Pressable>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Blue,
    height: scale(80),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontFamily: "Bold",
    color: Color.White,
    fontSize: scale(18),
    textTransform: "uppercase",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    position: "absolute",
    left: scale(12),
    fontSize: scale(22),
    color: Color.White,
    zIndex: 100,
  },
  iconBack: {
    fontSize: scale(22),
    color: Color.White,
    zIndex: 100,
  },
});
