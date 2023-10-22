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
import Header from "../../Components/Header";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import GradientButton from "../../Components/GradientButton";
import OTPTextInput from "react-native-otp-textinput";
import { BlurView as ExpoBlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../../context/ContextProvider";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../../Firebase";

const VerifyEmail = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [otp, setotp] = useState("");
  const { firebaseApi } = useStateContext();

  const handleReset = async () => {
    try {
      const credential = PhoneAuthProvider.credential(firebaseApi, otp);
      const userCredential = await signInWithCredential(auth, credential);
      console.log("Phone authentication successful:", userCredential.user);
      if (userCredential.user) {
        navigation.navigate("ResetPass");
      }
    } catch (err) {
      Alert.alert(
        "Invalid OTP",
        "The OTP (One-Time Password) you entered is incorrect. Please double-check the OTP you received and try again.",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "default",
          },
        ]
      );

      console.log("Error in phone authentication:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Header />
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Verification</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.InputContainer}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.subTtiel}>
                We have send you a code to verify
              </Text>
              <Text style={styles.subTtiel}>your email address</Text>
            </View>

            {/* four digit otp input here */}
            <Text style={styles.subTitle}>Enter Verification code:</Text>

            <OTPTextInput
              style={styles.inputContainer}
              handleTextChange={(e) => {
                setotp(e);
              }}
              inputCount={6}
            />
          </View>
          <View style={styles.haveAccount}>
            <Text style={{ ...styles.accountTitle, color: Color.Red }}>
              Didn't Receive yet?
            </Text>
            <Text style={styles.accountTitle}> Send Code Again </Text>
          </View>
          <GradientButton
            title="Continue"
            onPress={handleReset}
            containerStyle={styles.gradientButton}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <ExpoBlurView style={styles.blurView} tint="light" intensity={10}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.crossContainer}
                  >
                    <Image
                      source={require("../../../assets/cross.png")}
                      style={styles.cross}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Verify your Email</Text>
                  <Image
                    source={require("../../../assets/tick.png")}
                    style={styles.tickIcon}
                  />
                  <Text
                    style={{
                      ...styles.modalTitle,
                      fontFamily: "Medium",
                      fontSize: scale(16),
                    }}
                  >
                    Verify your Email
                  </Text>

                  <GradientButton
                    title="Confirm"
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    containerStyle={styles.modalButton}
                  />
                </View>
              </View>
            </ExpoBlurView>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: Color.Blue,
    height: scale(170),
  },
  image: {
    width: scale(120),
    height: scale(120),
    resizeMode: "contain",
    position: "relative",
    bottom: scale(45),
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
    bottom: scale(59),
  },
  formContainer: {
    backgroundColor: Color.White,
    height: "100%",
    position: "relative",
    borderTopRightRadius: scale(25),
    top: scale(-22),
    borderTopLeftRadius: scale(25),
    paddingHorizontal: scale(25),
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
    paddingVertical: scale(5),
    alignSelf: "center",
  },
  accountTitle: {
    fontFamily: "Bold",
    fontSize: scale(13),
    alignSelf: "center",
  },

  inputContainer: {
    marginTop: scale(40),
    color: Color.Blue,
    marginHorizontal: scale(6),
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
  },
  titleMain: {
    fontFamily: "Bold",
    alignSelf: "center",
    fontSize: scale(20),
    paddingVertical: scale(10),
  },
  subTitle: {
    fontFamily: "Bold",
    fontSize: scale(14),
    position: "relative",
    top: scale(22),
    left: scale(8),
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: scale(300),
  },
  modalContent: {
    backgroundColor: Color.White,
    width: "100%",
    paddingVertical: scale(20),
    alignItems: "center",
    borderRadius: scale(20),
    shadowColor: Color.Black,
    elevation: 6,
    borderColor: Color.Blue,
  },
  modalTitle: {
    fontFamily: "Bold",
    fontSize: scale(18),
    marginBottom: scale(20),
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cross: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain",
  },
  crossContainer: {
    position: "relative",
    right: scale(-120),
    top: scale(-15),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  tickIcon: {
    width: scale(90),
    height: scale(80),
    resizeMode: "contain",
  },
  modalButton: {
    width: scale(260),
  },
  subTtiel: {
    fontFamily: "Medium",
    fontSize: scale(14),
    fontWeight: "600",
  },
  CustomInput: {
    paddingVertical: scale(20),
  },
  titleContainer: {
    width: scale(230),
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: scale(20),
  },
});
