import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../Components/Header";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import CustomInput from "../../Components/CustomInput";
import GradientButton from "../../Components/GradientButton";
import { AntDesign } from "react-native-vector-icons";

const SignUp = () => {
  const handleSignUp = () => {};
  return (
    <View style={styles.container}>
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
              console.log("Input Text:", text);
            }}
          />

          <CustomInput
            placeholder="Email"
            onChangeText={(text) => {
              console.log("Input Text:", text);
            }}
          />

          <CustomInput
            placeholder="Password"
            onChangeText={(text) => {
              console.log("Input Text:", text);
            }}
          />

          <CustomInput
            placeholder="City"
            onChangeText={(text) => {
              console.log("Input Text:", text);
            }}
          />

          <CustomInput
            placeholder="State"
            onChangeText={(text) => {
              console.log("Input Text:", text);
            }}
          />

          <CustomInput
            placeholder="Country"
            onChangeText={(text) => {
              console.log("Input Text:", text);
            }}
          />

          <CustomInput
            placeholder="Phone Number"
            onChangeText={(text) => {
              console.log("Input Text:", text);
            }}
          />

          <GradientButton
            title="Register"
            onPress={handleSignUp}
            containerStyle={styles.gradientButton}
          />
        </View>

        <View style={styles.InputContainer}>
          <View style={styles.haveAccount}>
            <Text style={styles.accountTitle}>Already have an account? </Text>
            <Text style={{ ...styles.accountTitle, color: Color.Red }}>
              Login
            </Text>
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
});
