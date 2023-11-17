import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { scale } from "react-native-size-matters";
import OTPTextInput from "react-native-otp-textinput";
import { BlurView as ExpoBlurView } from "expo-blur";
import Header from "../../Components/Header";
import GradientButton from "../../Components/GradientButton";
import Color from "../../../assets/colors/Color";
import HeaderTitle from "../../Components/HeaderTitle";
import { useUserState, useUserStateActions } from "../../Slices/userSlice";
import { useNavigation } from "@react-navigation/native";
const AppLock = () => {
  const navigation = useNavigation();
  const userState = useUserState();
  const userStateActions = useUserStateActions();
  const [pin, setpin] = useState("");

  const handleSetPin = () => {
    if (pin.length === 4) {
      userStateActions.setAuthMethod({ authMethod: "pin", pin: pin });
      alert("Pin Set Successfully");
    } else {
      alert("Pin should be 4 digits");
    }
    console.log("called");
  };
  return (
    <View style={styles.container}>
      <HeaderTitle title="APP LOCK" />
      <View style={styles.formContainer}>
        <View style={styles.InputContainer}>
          <View>
            <Image
              source={require("../../../assets/unlock.png")}
              style={styles.image}
            />
            <Text style={styles.titleMain}>CREATE A NEW POCKETPAL PIN</Text>

            <OTPTextInput
              style={styles.inputContainer}
              handleTextChange={(code) => {
                setpin(code);
              }}
              inputCount={4}
            />
          </View>
          <GradientButton
            title="Continue"
            containerStyle={styles.gradientButton}
            onPress={handleSetPin}
          />
        </View>
      </View>
    </View>
  );
};

export default AppLock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: scale(73),
    height: scale(73),
    alignSelf: "center",
    marginVertical: scale(10),
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Bold",
    fontSize: scale(18),
    color: Color.White,
    position: "relative",
    bottom: scale(20),
  },
  formContainer: {
    backgroundColor: Color.White,
    height: "100%",
    position: "relative",
    borderTopRightRadius: scale(12),
    top: scale(-22),
    borderTopLeftRadius: scale(12),
  },

  InputContainer: {
    // width: scale(280),
    alignSelf: "center",
    paddingVertical: scale(15),
    gap: scale(18),
  },
  haveAccount: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    top: scale(-20),
    alignSelf: "center",
  },
  accountTitle: {
    fontFamily: "Bold",
    fontSize: scale(13),
    alignSelf: "center",
  },

  inputContainer: {
    marginTop: scale(20),
    color: Color.Blue,
    marginHorizontal: scale(14),
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Medium",
    width: scale(40),
    height: scale(45),
    alignSelf: "center",
    backgroundColor: Color.White,
    borderRadius: 8,
    shadowColor: Color.Black,
    elevation: 4,
    borderColor: Color.Blue,
    borderWidth: 1,
    marginBottom: scale(30),
  },
  titleMain: {
    fontFamily: "Bold",
    alignSelf: "center",
    fontSize: scale(14),
    paddingVertical: scale(10),
  },
});
