import { Image, StyleSheet, Text, View, Alert } from "react-native";
import React, { useRef, useState } from "react";
import Header from "../../Components/Header";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import CustomInput from "../../Components/CustomInput";
import GradientButton from "../../Components/GradientButton";
import { useNavigation } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../Hooks/FirebaseConfig";
import { PhoneAuthProvider } from "firebase/auth";
import { auth } from "../../../Firebase";
import { useStateContext } from "../../context/ContextProvider";

const ForgotPass = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);
  const {
    firebaseApi,
    setfirebaseApi,
    userSignUpData,
    setuserSignUpData,
    resetPass,
    setresetPass,
  } = useStateContext();

  const handleVerify = () => {
    navigation.navigate("verifyEmail");

    // try {
    //   const res = `${BASE_URL}/resetPass`;
    //   console.log(res);
    // } catch (error) {
    //   console.log("error", error);
    // }
  };
  const handleVerificationCode = async () => {
    if (!phoneNumber) {
      Alert.alert("All fields are required");
      return;
    }
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setfirebaseApi(verificationId);
      setresetPass(phoneNumber);
      navigation.navigate("verifyEmail");

      // navigation.navigate("Otp");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Header />
        <View style={styles.imageContainer}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            // languageCode = {i18n.language}
          />
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Forgot Password</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.InputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.subTtiel}>
              Please enter your phone number so we can send you a verification
              code
            </Text>
          </View>
          <View style={styles.CustomInput}>
            <CustomInput
              placeholder='Phone Number, e.g., +92300000000'
              onChangeText={(text) => {
                setphoneNumber(text);
              }}
            />
          </View>
          <GradientButton
            title='Send reset code'
            onPress={() => handleVerificationCode(recaptchaVerifier)}
            containerStyle={styles.gradientButton}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPass;

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
  subTtiel: {
    fontFamily: "Medium",
    fontSize: scale(14),
    fontWeight: "600",
    textAlign: "center",
  },
  CustomInput: {
    paddingVertical: scale(20),
  },
  titleContainer: {
    width: scale(260),
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: scale(30),
  },
});
