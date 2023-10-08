import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { AntDesign } from "react-native-vector-icons";
import Color from "../../../assets/colors/Color";

const SearchInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AntDesign name="search1" style={styles.icon} />
        <TextInput placeholder="Search" />
      </View>
      <View>
        <Image
          source={require("../../../assets/pdfIcon.png")}
          style={styles.pdf}
        />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: scale(321),
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: scale(10),
    gap: scale(22),
    alignItems: "center",
  },
  inputContainer: {
    width: scale(250),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingHorizontal: scale(6),
    borderWidth: scale(1),
    borderColor: Color.Border,
    borderRadius: scale(8),
    paddingVertical: scale(3),
  },
  icon: {
    fontSize: scale(16),
  },
  pdf: {
    width: scale(26),
    height: scale(26),
  },
});
