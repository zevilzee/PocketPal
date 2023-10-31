import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "react-native-vector-icons";

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle title="pROFILE" />

      {/* Bottom container  */}
      <View style={styles.contentContainer}>
        {/* Image Container  */}
        <View style={styles.imageContainer}>
          <View style={styles.imageMain}>
            <Image
              source={require("../../../assets/imagePlaceHolder.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.iconContainer}>
            <AntDesign name="camera" style={styles.icon} />
          </View>
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    gap: scale(10),
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
});
