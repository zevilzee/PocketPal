import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BlurView as ExpoBlurView } from "expo-blur";
import { Entypo } from "react-native-vector-icons";
import GradientButton from "./GradientButton";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";
import { useNavigation } from "@react-navigation/native";

const SignUpCompleteModal = ({
  modalVisible,
  setModalVisible,
  handleSignUp,
}) => {
  const navigation = useNavigation();
  const handlenavigation = async () => {
    await handleSignUp();
    navigation.navigate("Login");
    setModalVisible(false);
  };

  return (
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
                source={require("../../assets/cross.png")}
                style={styles.cross}
              />
            </TouchableOpacity>
            <Image
              source={require("../../assets/tick.png")}
              style={styles.tickIcon}
            />
            <Text style={styles.modalTitle}>Successfully Registered</Text>
            <Text
              style={{
                ...styles.modalTitle,
                fontFamily: "Medium",
                fontSize: scale(16),
                width: scale(180),
              }}
            >
              Your account has been successfully registered.
            </Text>

            <GradientButton
              title='Login'
              onPress={handlenavigation}
              containerStyle={styles.modalButton}
            />
          </View>
        </View>
      </ExpoBlurView>
    </Modal>
  );
};

export default SignUpCompleteModal;

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
