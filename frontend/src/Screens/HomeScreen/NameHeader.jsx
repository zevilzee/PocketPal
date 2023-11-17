import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { AntDesign } from "react-native-vector-icons";
import Color from "../../../assets/colors/Color";
import { useUserState } from "../../Slices/userSlice";
import { BASE_URL } from "../../../CONSTANTS";

const NameHeader = ({ userName }) => {
  const userState = useUserState();
  console.log(userState?.image);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Image
            source={{ uri: `${BASE_URL}/${userState?.image}` }}
            style={styles.userImage}
          />
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.title}>Good Morning,</Text>
          <Text style={styles.name}>{userName}!</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name='bells' style={styles.icons} />
        <AntDesign name='search1' style={styles.icons} />
      </View>
    </View>
  );
};

export default NameHeader;

const styles = StyleSheet.create({
  container: {
    width: scale(310),
    alignSelf: "center",
    paddingVertical: scale(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImage: {
    width: scale(50),
    height: scale(50),
    resizeMode: "contain",
    borderRadius: scale(30),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  title: {
    fontFamily: "Medium",
    fontSize: scale(14),
    fontWeight: "400",
  },
  name: {
    fontFamily: "Bold",
    fontSize: scale(14),
    color: Color.Blue,
    paddingVertical: scale(2),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(14),
  },
  icons: {
    fontSize: scale(20),
  },
});
