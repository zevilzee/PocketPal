import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { MaterialIcons, AntDesign, Entypo } from "react-native-vector-icons";
import { Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AppLockScreen = () => {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <HeaderTitle title='APP LOCK' />
      <View style={styles.contentContainer}>
        <View style={styles.itemCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AppLock")}
            style={styles.topContainer}
          >
            <View style={styles.lock}>
              <AntDesign name='lock' size={20} color={Color.Blue} />
              <Text style={styles.title}>Pin Code</Text>
            </View>
            <MaterialIcons name='keyboard-arrow-right' size={20} />
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            <View style={styles.lock}>
              <Entypo name='fingerprint' size={20} color={Color.Blue} />
              <Text style={styles.title}>Finger Print</Text>
            </View>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppLockScreen;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Color.White,
    flex: 1,
    bottom: scale(20),
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  itemCard: {
    backgroundColor: Color.White,
    width: "90%",
    alignSelf: "center",
    marginVertical: scale(20),
    borderRadius: scale(10),
    elevation: 4,
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    justifyContent: "center",
  },
  topContainer: {
    paddingVertical: scale(13),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBlockColor: Color.Input,
    paddingHorizontal: scale(10),
  },
  lock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bottomContainer: {
    paddingVertical: scale(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: scale(10),
  },
  title: {
    fontFamily: "Medium",
    color: Color.Blue,
    fontSize: 14,
  },
});
