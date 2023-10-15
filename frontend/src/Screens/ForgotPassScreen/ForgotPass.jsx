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
import { BlurView as ExpoBlurView } from "expo-blur";

const ForgotPass = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setemail] = useState("");

  const handleVerify = () => {
    navigation.navigate("verifyEmail");
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
          <Text style={styles.title}>Forgot Password</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.InputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.subTtiel}>
              Please enter your email so we can
            </Text>
            <Text style={styles.subTtiel}>send you a verification code</Text>
          </View>
          <View style={styles.CustomInput}>
            <CustomInput
              placeholder="Email"
              onChangeText={(text) => {
                setemail(text);
              }}
            />
          </View>
          <GradientButton
            title="Send reset code"
            onPress={handleVerify}
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
  },
  CustomInput: {
    paddingVertical: scale(20),
  },
  titleContainer: {
    width: scale(230),
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: scale(30),
  },
});
