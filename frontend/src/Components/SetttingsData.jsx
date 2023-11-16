import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  SimpleLineIcons,
  MaterialIcons,
  Entypo,
  AntDesign,
  Ionicons,
} from "react-native-vector-icons";
import Color from "../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import LanguageModal from "./LanguageModal";
import { Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SetttingsData = () => {
  const navigation = useNavigation();
  const [modalVisible, setmodalVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containermain}>
        <View style={styles.leftContainer}>
          <Ionicons name='notifications-outline' style={styles.icoMain} />
          <Text style={styles.title}>Quick entry from notification</Text>
        </View>
        <View>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.containermain}
        onPress={() => navigation.navigate("AppLockScreen")}
      >
        <View style={styles.leftContainer}>
          <AntDesign name='lock1' style={styles.icoMain} />
          <Text style={styles.title}>App Lock</Text>
        </View>
        <View>
          <MaterialIcons name='keyboard-arrow-right' style={styles.arrowLeft} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.containermain, borderBottomWidth: 0 }}
        onPress={() => setmodalVisible(true)}
      >
        <View style={styles.leftContainer}>
          <Ionicons name='language' style={styles.icoMain} />
          <Text style={styles.title}>Language</Text>
        </View>
        <View>
          <MaterialIcons name='keyboard-arrow-right' style={styles.arrowLeft} />
        </View>
      </TouchableOpacity>
      <LanguageModal
        modalVisible={modalVisible}
        setModalVisible={setmodalVisible}
      />
    </View>
  );
};

export default SetttingsData;

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
