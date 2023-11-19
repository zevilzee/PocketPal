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
import { useNavigation } from "@react-navigation/native";
import { useUserState, useUserStateActions } from "../../Slices/userSlice";
import axios from "axios";
import { BASE_URL } from "../../../CONSTANTS";

const UserProfile = () => {
  const navigation = useNavigation();
  const userActions = useUserStateActions();

  const [image, setImage] = useState("");
  const userState = useUserState();
  const [name, setname] = useState(userState?.fullName);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [fileName, setfileName] = useState("");
  const [phoneNumber, setphoneNumber] = useState(
    userState?.phoneNumber.toString()
  );
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setfileName(result.assets[0].fileName);
    }
  };

  const handleUpdateImage = async () => {
    const formData = new FormData();

    name !== userState?.fullName && formData.append("name", name);
    email !== "" && formData.append("email", email);
    if (password !== "") {
      formData.append("password", password);
    }
    phoneNumber !== "" && formData.append("phoneNumber", phoneNumber);

    if (image) {
      // console.log(image);
      formData.append("image", {
        name: `${userState?.fullName}.jpg`,
        uri: image,
        type: "image/png",
      });
    }
    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-picture/${userState?.id}`,
        formData
      );
      console.log(res.data);
      userActions.setUser(res.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : null}
    >
      <View style={styles.container}>
        <HeaderTitle title='pROFILE' />

        {/* Bottom container  */}
        <ScrollView style={styles.contentContainer}>
          {/* Image Container  */}
          <View style={styles.imageContainer}>
            <View style={styles.imageMain}>
              {image === "" ? (
                <Image
                  style={styles.image}
                  source={{ uri: `${BASE_URL}/${userState?.image}` }}
                />
              ) : (
                <Image source={{ uri: image }} style={styles.image} />
              )}
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handlePickImage}
            >
              <AntDesign name='camera' style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* Form Container  */}
          <View style={styles.formContainer}>
            {/* User details  */}
            <View style={styles.formContent}>
              <TouchableOpacity style={styles.formMain}>
                <View style={styles.contentLeft}>
                  <MaterialCommunityIcons
                    name='account-edit'
                    style={styles.iconLeft}
                  />
                  <TextInput
                    placeholder='User name'
                    value={name}
                    onChangeText={(text) => setname(text)}
                  />
                </View>
                <View>
                  <Feather name='edit-3' style={styles.iconRight} />
                </View>
              </TouchableOpacity>
              <View style={styles.formMain}>
                <View style={styles.contentLeft}>
                  <FontAwesome name='phone' style={styles.iconLeft} />
                  <TextInput
                    placeholder='Phone No'
                    value={phoneNumber}
                    keyboardType='number-pad'
                    onChangeText={(text) => setphoneNumber(text)}
                  />
                </View>
                <View>
                  <Feather name='edit-3' style={styles.iconRight} />
                </View>
              </View>
              <View style={styles.formMain}>
                <View style={styles.contentLeft}>
                  <MaterialCommunityIcons
                    name='email'
                    style={styles.iconLeft}
                    value={email}
                  />
                  <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setemail(text)}
                  />
                </View>
                <View>
                  <Feather name='edit-3' style={styles.iconRight} />
                </View>
              </View>
              <View style={styles.formMain}>
                <View style={styles.contentLeft}>
                  <Fontisto name='locked' style={styles.iconLeft} />
                  <TextInput
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                  />
                </View>
                <View>
                  <Feather name='edit-3' style={styles.iconRight} />
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <GradientButton
                title='Save'
                onPress={() => handleUpdateImage()}
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
