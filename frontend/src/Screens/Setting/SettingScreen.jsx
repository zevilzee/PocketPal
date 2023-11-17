import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import ProfileCardUser from "../../Components/ProfileCardUser";
import {
  AntDesign,
  MaterialIcons,
  Entypo,
  SimpleLineIcons,
} from "react-native-vector-icons";
import SetttingsData from "../../Components/SetttingsData";
import HelpSupport from "../../Components/HelpSupport";
import About from "../../Components/About";
import AppBottomTab from "../../Components/AppBottomTab";
import { useUserState, useUserStateActions } from "../../Slices/userSlice";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("screen").height;

const SettingScreen = () => {
  const navigation = useNavigation();
  const userState = useUserState();
  const [isSetting, setisSetting] = useState(false);
  const [isHelp, setisHelp] = useState(false);
  const [isAbout, setisAbout] = useState(false);

  const handleIsSettingOpen = () => {
    setisSetting(!isSetting);
  };

  const handleIsHelp = () => {
    setisHelp(!isHelp);
  };

  const handleIsAbout = () => {
    setisAbout(!isAbout);
  };
  const userActions = useUserStateActions();
  const Logout = () => {
    userActions.resetState();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  return (
    <View style={styles.container}>
      <HeaderTitle title='Setting' />

      <View style={styles.contentContainer}>
        {/* User Profile Card  */}
        <ProfileCardUser />

        {/* SettingCard  */}

        <View style={styles.userCard}>
          <TouchableOpacity
            style={styles.containermain}
            onPress={handleIsSettingOpen}
          >
            <View style={styles.leftContainer}>
              <AntDesign name='setting' style={styles.icoMain} />
              <Text style={styles.title}>Setting</Text>
            </View>
            <View>
              <MaterialIcons
                name={
                  isSetting ? "keyboard-arrow-down" : "keyboard-arrow-right"
                }
                style={styles.arrowLeft}
              />
            </View>
          </TouchableOpacity>
          {isSetting && <SetttingsData />}

          <TouchableOpacity style={styles.containermain} onPress={handleIsHelp}>
            <View style={styles.leftContainer}>
              <Entypo name='help-with-circle' style={styles.icoMain} />
              <Text style={styles.title}>Help & Support</Text>
            </View>
            <View>
              <MaterialIcons
                name={isHelp ? "keyboard-arrow-down" : "keyboard-arrow-right"}
                style={styles.arrowLeft}
              />
            </View>
          </TouchableOpacity>
          {isHelp && <HelpSupport />}
          <TouchableOpacity
            style={styles.containermain}
            onPress={handleIsAbout}
          >
            <View style={styles.leftContainer}>
              <AntDesign name='minuscircle' style={styles.icoMain} />
              <Text style={styles.title}>About Us</Text>
            </View>
            <View>
              <MaterialIcons
                name={isAbout ? "keyboard-arrow-down" : "keyboard-arrow-right"}
                style={styles.arrowLeft}
              />
            </View>
          </TouchableOpacity>

          {isAbout && <About />}

          <TouchableOpacity
            style={{ ...styles.containermain, borderBottomWidth: 0 }}
          >
            <TouchableOpacity style={styles.leftContainer} onPress={Logout}>
              <SimpleLineIcons name='logout' style={styles.icoMain} />
              <Text style={styles.title}>Logout</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: screenHeight * 0 - 15,
            zIndex: 100,
          }}
        >
          <AppBottomTab active='user' />
        </View>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: scale(14),
    borderTopRightRadius: scale(14),
    bottom: scale(14),
    backgroundColor: Color.White,
  },
  userCard: {
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
  },
  containermain: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Color.Border,
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
