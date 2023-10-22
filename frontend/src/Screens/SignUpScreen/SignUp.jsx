import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import Header from "../../Components/Header";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import CustomInput from "../../Components/CustomInput";
import GradientButton from "../../Components/GradientButton";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView as ExpoBlurView } from "expo-blur";
import { Entypo } from "react-native-vector-icons";
import axios from "axios";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from "firebase/auth";
import {
  PhoneAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";

import PasswordInput from "../../Components/PasswordInput";
import { BASE_URL } from "../../../CONSTANTS";
import { auth } from "../../../Firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useStateContext } from "../../context/ContextProvider";
import { firebaseConfig } from "../../Hooks/FirebaseConfig";

const SignUp = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // State to store the OTP
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [VerificationId, setVerificationId] = useState("");
  const recaptchaVerifier = useRef(null);

  const { firebaseApi, setfirebaseApi, userSignUpData, setuserSignUpData } =
    useStateContext();
  // console.log(firebaseApi);

  // const auth = getAuth();

  // console.log(auth);

  // Import Firebase auth from your Firebase setup
  // const handleSignUp = async () => {
  //   try {
  //     console.log(name, email, password, city, state, country, phoneNumber);

  //     // Create a user with email and password in Firebase
  //     createUserWithEmailAndPassword(auth, email, password).then(
  //       (userCredential) => {
  //         // Signed up
  //         const user = userCredential.user;

  //         // Send email verification to the user
  //         console.log(user);
  //         sendEmailVerification(auth.currentUser)
  //           .then((res) => {
  //             // Show the success modal
  //             console.log(res);
  //             setModalVisible(true);
  //           })
  //           .catch((error) => {
  //             console.error("Error sending email verification", error);
  //           });
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error during user registration", error);
  //     // Handle the registration error (e.g., show an error message to the user)
  //   }
  // };

  // console.log(userData);
  const handleVerificationCode = async (recaptchaVerifier) => {
    const userData = {
      name,
      phoneNumber,
      email,
      city,
      state,
      country,
      password,
    };

    if (
      !name ||
      !password ||
      !phoneNumber ||
      !city ||
      !country ||
      !state ||
      !email
    ) {
      Alert.alert("All fields are required");
      return;
    }
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setfirebaseApi(verificationId);
      setuserSignUpData(userData);
      navigation.navigate("Otp");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handlenavigation = () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handlePassChange = (text) => {
    setPassword(text);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : null}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            // languageCode = {i18n.language}
          />
          <View style={styles.topContainer}>
            <Header />
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/logo.png")}
                style={styles.image}
              />
              <Text style={styles.title}>Sign Up</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.InputContainer}>
              <CustomInput
                placeholder="Name Here"
                onChangeText={(text) => {
                  setname(text);
                }}
              />

              <CustomInput
                placeholder="Email"
                onChangeText={(text) => {
                  setemail(text);
                }}
              />

              <PasswordInput
                placeholder="Password"
                value={password}
                onChangeText={handlePassChange}
                style={styles.input}
                icon={
                  passwordVisible ? (
                    <Entypo name="eye" size={20} color={Color.Blue} />
                  ) : (
                    <Entypo name="eye-with-line" size={20} color={Color.Blue} />
                  )
                }
                onIconPress={() => setPasswordVisible(!passwordVisible)}
                secureTextEntry={!passwordVisible}
              />
              <CustomInput
                placeholder="City"
                onChangeText={(text) => {
                  setcity(text);
                }}
              />

              <CustomInput
                placeholder="State"
                onChangeText={(text) => {
                  setstate(text);
                }}
              />

              <CustomInput
                placeholder="Country"
                onChangeText={(text) => {
                  setcountry(text);
                }}
              />

              <CustomInput
                placeholder="Phone Number, e.g., +92300000000"
                onChangeText={(text) => {
                  setphoneNumber(text);
                }}
              />

              <GradientButton
                title="Register"
                onPress={() => handleVerificationCode(recaptchaVerifier)}
                containerStyle={styles.gradientButton}
              />
            </View>

            <View style={styles.InputContainer}>
              <Pressable onPress={handleLogin} style={styles.haveAccount}>
                <Text style={styles.accountTitle}>
                  Already have an account?{" "}
                </Text>
                <Text style={{ ...styles.accountTitle, color: Color.Red }}>
                  Login
                </Text>
              </Pressable>
            </View>

            <View style={styles.orContainer}>
              <Text style={styles.or}>or</Text>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../assets/google.png")}
                  style={styles.google}
                />
                <Text style={styles.line}></Text>
                <AntDesign name="apple1" style={styles.apple} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
    position: "relative",
    top: scale(-20),
    alignSelf: "center",
  },
  accountTitle: {
    fontFamily: "Bold",
    fontSize: scale(13),
    alignSelf: "center",
  },
  orContainer: {
    alignItems: "center",
    position: "relative",
    top: scale(-30),
  },
  or: {
    fontFamily: "Regular",
    fontSize: scale(13),
  },
  google: {
    width: scale(40),
    height: scale(40),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: scale(140),
    marginTop: scale(10),
  },
  apple: {
    fontSize: scale(35),
  },
  line: {
    width: scale(2),
    height: scale(38),
    backgroundColor: Color.Input,
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
});
