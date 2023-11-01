import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { MaterialIcons, AntDesign } from "react-native-vector-icons";
import Color from "../../assets/colors/Color";

const AppBottomTab = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign name="home" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="wallet" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="compare-arrows" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="user" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default AppBottomTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    height: scale(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 1,
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: Color.Border,
  },

  icon: {
    fontSize: scale(20),
  },
});
