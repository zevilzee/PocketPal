import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { useUserState } from "../Slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../CONSTANTS";

const ProfileCardUser = () => {
  const userState = useUserState();
  const navigation = useNavigation();
  return (
    <View style={styles.userCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserProfile")}
        style={styles.topContainer}
      >
        <View style={styles.userContainer}>
          <Image
            source={{ uri: `${BASE_URL}/${userState?.image}` }}
            style={styles.userImage}
          />
          <Text>{userState?.fullName}</Text>
        </View>
        <View>
          <Text>Update</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <View>
          <Text>Profile Strength</Text>
        </View>
        <View>
          <Text>05</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCardUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: scale(14),
    borderTopRightRadius: scale(14),
    bottom: scale(14),
    backgroundColor: Color.White,
  },
  userCard: {
    backgroundColor: Color.White,
    width: "90%",
    alignSelf: "center",
    height: scale(100),
    justifyContent: "space-evenly",
    marginVertical: scale(20),
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
  userImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    width: "90%",
    alignSelf: "center",
    borderBottomColor: Color.Border,
    paddingVertical: scale(4),
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    paddingVertical: scale(4),
  },
});
