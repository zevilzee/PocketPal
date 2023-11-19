import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "../../Components/Header";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import CustomInput from "../../Components/CustomInput";
import GradientButton from "../../Components/GradientButton";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "react-native-vector-icons";
import PasswordInput from "../../Components/PasswordInput";
import axios from "axios";
import { BASE_URL } from "../../../CONSTANTS";
import { useUserState, useUserStateActions } from "../../Slices/userSlice";
const LoginScreen = () => {
  const userActions = useUserStateActions();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleForget = () => {
    navigation.navigate("Forgot");
  };
  const handlePassChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/user/sign-in`, {
        email,
        password,
      });
      userActions.setUser(res.data.user);
      userActions.settoken(res.headers.auth_token);

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.log("error in login screen", error);
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
          <Text style={styles.title}>Login</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.InputContainer}>
          <CustomInput
            placeholder="Email"
            onChangeText={(text) => {
              setemail(text);
            }}
          />
          <CustomInput placeholder="Password" onChangeText={handlePassChange} />

          <TouchableOpacity
            style={styles.forgetContainer}
            onPress={handleForget}
          >
            <Text style={styles.forgetTitle}>Forget Password?</Text>
          </TouchableOpacity>

          <GradientButton
            title="Login"
            onPress={handleLogin}
            containerStyle={styles.gradientButton}
          />
        </View>

        <View style={styles.InputContainer}>
          <View style={styles.haveAccount}>
            <Text style={styles.accountTitle}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ ...styles.accountTitle, color: Color.Red }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
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
    </View>
  );
};

export default LoginScreen;

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
  forgetContainer: {
    paddingVertical: scale(20),
    alignItems: "flex-end",
  },
  forgetTitle: {
    fontFamily: "Bold",
    fontSize: scale(14),
  },
});
