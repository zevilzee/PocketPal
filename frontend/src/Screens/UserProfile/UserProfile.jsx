import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Fontisto,
} from "react-native-vector-icons";
import GradientButton from "../../Components/GradientButton";
import AppBottomTab from "../../Components/AppBottomTab";
import * as ImagePicker from "expo-image-picker";

const UserProfile = () => {
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : null}
    >
      <View style={styles.container}>
        <HeaderTitle title="pROFILE" />

        {/* Bottom container  */}
        <ScrollView style={styles.contentContainer}>
          {/* Image Container  */}
          <View style={styles.imageContainer}>
            <View style={styles.imageMain}>
              <Image
                source={require("../../../assets/imagePlaceHolder.png")}
                style={styles.image}
              />
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handlePickImage}
            >
              <AntDesign name="camera" style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* Form Container  */}
          <View style={styles.formContainer}>
            {/* User details  */}
            <View style={styles.formContent}>
              <View style={styles.formMain}>
                <View style={styles.contentLeft}>
                  <MaterialCommunityIcons
                    name="account-edit"
                    style={styles.iconLeft}
                  />
                  <TextInput placeholder="User name" />
                </View>
                <View>
                  <Feather name="edit-3" style={styles.iconRight} />
                </View>
              </View>
              <View style={styles.formMain}>
                <View style={styles.contentLeft}>
                  <FontAwesome name="phone" style={styles.iconLeft} />
                  <TextInput placeholder="Phone No" />
                </View>
                <View>
                  <Feather name="edit-3" style={styles.iconRight} />
                </View>
              </View>
              <View style={styles.formMain}>
                <View style={styles.contentLeft}>
                  <MaterialCommunityIcons
                    name="email"
                    style={styles.iconLeft}
                  />
                  <TextInput placeholder="Email" />
                </View>
                <View>
                  <Feather name="edit-3" style={styles.iconRight} />
                </View>
              </View>
              <View style={styles.formMain}>
                <View style={styles.contentLeft}>
                  <Fontisto name="locked" style={styles.iconLeft} />
                  <TextInput placeholder="Password" />
                </View>
                <View>
                  <Feather name="edit-3" style={styles.iconRight} />
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <GradientButton
                title="Save"
                // onPress={() => handleVerificationCode(recaptchaVerifier)}
                containerStyle={styles.gradientButton}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomTab}>
          <AppBottomTab />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    backgroundColor: Color.White,
    flex: 1,
    position: "relative",
    bottom: scale(13),
    borderTopRightRadius: scale(12),
    borderTopLeftRadius: scale(12),
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: scale(170),
  },
  imageMain: {
    width: scale(128),
    height: scale(128),
    borderRadius: scale(64),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: Color.Bg,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  iconContainer: {
    position: "absolute",
    backgroundColor: Color.Blue,
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    alignItems: "center",
    justifyContent: "center",
    right: scale(110),
    top: scale(110),
  },
  icon: {
    fontSize: scale(19),
    color: Color.White,
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    width: "88%",
    alignSelf: "center",
    gap: scale(20),
    marginTop: scale(10),
  },
  formMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
    backgroundColor: Color.White,
    borderRadius: scale(10),
    elevation: 4,
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  contentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  iconLeft: {
    fontSize: scale(22),
    color: Color.Blue,
  },
  iconRight: {
    fontSize: scale(14),
    color: Color.Blue,
  },
  buttonContainer: {
    width: "80%",
    alignSelf: "center",
    marginVertical: scale(18),
  },
  bottomTab: {
    backgroundColor: "yellow",
    position: "relative",
    bottom: 0,
  },
});
