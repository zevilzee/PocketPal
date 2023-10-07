import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Color from "../../../assets/colors/Color";
import Header from "../../Components/Header";
import { scale } from "react-native-size-matters";
import GradientButton from "../../Components/GradientButton";
import { useNavigation } from "@react-navigation/native";

const LoginOrSignUpScreen = () => {
  const navigation = useNavigation();
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <View
          style={{
            paddingVertical: scale(30),
          }}
        >
          <Image
            source={require("../../../assets/pocket.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title="Sign Up"
            onPress={handleSignUp}
            containerStyle={styles.gradientButton}
          />
          <Text style={styles.or}>OR</Text>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginOrSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: scale(180),
    height: scale(120),
    resizeMode: "contain",
  },
  gradientButton: {
    width: scale(300),
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: scale(20),
  },

  button: {
    borderRadius: scale(20),
    width: scale(300),
    borderWidth: 0.5,
    borderColor: Color.Blue,
  },
  buttonText: {
    // color: Color.Black,
    fontSize: scale(16),
    textAlign: "center",
    padding: scale(12),
    fontFamily: "Medium",
  },
  or: {
    fontFamily: "Bold",
    fontSize: scale(24),
  },
});
