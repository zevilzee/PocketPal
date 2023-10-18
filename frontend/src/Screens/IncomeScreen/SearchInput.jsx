import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { AntDesign, MaterialCommunityIcons } from "react-native-vector-icons";
import Color from "../../../assets/colors/Color";

const SearchInput = ({ filter, screen, modalVisible }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AntDesign name="search1" style={styles.icon} />
        <TextInput placeholder="Search" />
      </View>
      <View style={styles.iconsContainer}>
        {screen === "EXPENSE" && (
          <TouchableOpacity
            style={{ position: "relative", right: scale(12) }}
            onPress={() => modalVisible(true)}
          >
            <MaterialCommunityIcons
              name="filter-menu-outline"
              style={styles.filter}
            />
          </TouchableOpacity>
        )}
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
    width: scale(240),
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
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filter: {
    // position: "relative",
    fontSize: scale(23),
  },
});
