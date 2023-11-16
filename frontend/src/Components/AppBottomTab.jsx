import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  Fontisto,
  Feather,
} from "react-native-vector-icons";
import Color from "../../assets/colors/Color";
import { useNavigation } from "@react-navigation/native";

const AppBottomTab = ({ active }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <AntDesign
          name='home'
          style={styles.icon}
          color={active === "home" ? Color.Blue : null}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons
          name='wallet-outline'
          style={styles.icon}
          color={active === "wallet" ? Color.Blue : null}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Fontisto
          name='arrow-swap'
          style={styles.icon}
          color={active === "wallet" ? Color.Blue : null}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SettingScreen")}>
        <Feather
          name='user'
          style={styles.icon}
          color={active === "user" ? Color.Blue : null}
        />
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
  images: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
