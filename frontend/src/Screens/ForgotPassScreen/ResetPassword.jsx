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
import { BlurView as ExpoBlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../Components/CustomInput";
import { Entypo } from "react-native-vector-icons";
import PasswordInput from "../../Components/PasswordInput";
import axios from "axios";
import { BASE_URL } from "../../../CONSTANTS";
import { useStateContext } from "../../context/ContextProvider";

const ResetPassword = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [confirmPassword, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { firebaseApi, userSignUpData, resetPass } = useStateContext();
  const phone = userSignUpData;

  const handleReset = async () => {
    console.log("reset");
    if (!password || !confirmPassword) {
      Alert.alert("Please fill in both password fields.");
    } else if (password === confirmPassword) {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/forgot-password/${resetPass}`,
          {
            password: password,
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          const updatedUser = response.data.message;
        } else {
          console.log(
            "Password update failed. Server returned:",
            response.status,
            response.data.message
          );
        }
      } catch (error) {
        console.error("An error occurred while updating the password:", error);
      }
    } else {
      Alert.alert("Password and Confirm Password do not match");
    }
  };
  const handleVerifyAuto = (e) => {
    console.log(e);
  };

  const handleSignUp = () => {};

  const handlePassChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPassword = (text) => {
    setconfirmPassword(text);
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
          <Text style={styles.title}>Reset Password</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.InputContainer}>
          <View style={styles.InputContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.subTtiel}>
                Please enter your new password to
              </Text>
              <Text style={styles.subTtiel}>continue</Text>
            </View>
            <PasswordInput
              placeholder='Enter your Password'
              value={password}
              onChangeText={handlePassChange}
              style={styles.input}
              icon={
                passwordVisible ? (
                  <Entypo name='eye' size={20} color={Color.Blue} />
                ) : (
                  <Entypo name='eye-with-line' size={20} color={Color.Blue} />
                )
              }
              onIconPress={() => setPasswordVisible(!passwordVisible)}
              secureTextEntry={!passwordVisible}
            />

            <PasswordInput
              placeholder='Confirm Password'
              value={confirmPassword}
              onChangeText={handleConfirmPassword}
              style={styles.input}
              icon={
                passwordVisible ? (
                  <Entypo name='eye' size={20} color={Color.Blue} />
                ) : (
                  <Entypo name='eye-with-line' size={20} color={Color.Blue} />
                )
              }
              onIconPress={() => setPasswordVisible(!passwordVisible)}
              secureTextEntry={!passwordVisible}
            />
          </View>
          <GradientButton
            title='Reset Password'
            onPress={handleReset}
            containerStyle={styles.gradientButton}
          />

          <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <ExpoBlurView style={styles.blurView} tint='light' intensity={10}>
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
                  <Image
                    source={require("../../../assets/tick.png")}
                    style={styles.tickIcon}
                  />
                  <Text style={styles.modalTitle}>Congratulations</Text>

                  <View
                    style={{
                      ...styles.titleContainer,
                      marginBottom: scale(12),
                    }}
                  >
                    <Text style={styles.subTtiel}>Your password has been</Text>
                    <Text style={styles.subTtiel}>successfully changed</Text>
                  </View>
                </View>
              </View>
            </ExpoBlurView>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;

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
    marginHorizontal: scale(18),
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
    left: scale(20),
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
    // marginBottom: scale(20),
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
