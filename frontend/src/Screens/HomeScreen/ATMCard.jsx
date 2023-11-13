import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { AntDesign } from "react-native-vector-icons";
import Color from "../../../assets/colors/Color";
import { LinearGradient } from "expo-linear-gradient";
import { useUserState } from "../../Slices/userSlice";

const ATMCard = ({ balance }) => {
  const userState = useUserState();
  const totalBalce = userState?.totalIncome - userState?.totalExpence;

  return (
    // <ImageBackground
    //   style={styles.imageBg}
    //   source={require("../../../assets/atmbg.png")}
    //   //   imageStyle={{ borderRadius: 22 }}
    // >
    //   <View style={styles.contentContainer}>
    //     <View>
    //       <Text style={styles.total}>Total Balance</Text>
    //       <Text style={styles.amount}>$45,000</Text>
    //     </View>
    //     <View>
    //       <Text style={styles.spent}>Spent money</Text>
    //       <Text style={styles.amountSpend}>$45,000</Text>
    //     </View>
    //   </View>
    // </ImageBackground>
    <View>
      <LinearGradient
        colors={["#2842A9", "#C66DB4"]}
        start={{ x: 0.46, y: 0.77 }}
        end={{ x: 0.11, y: 0.55 }}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.total}>Total Balance</Text>
            <Text style={styles.amount}>${totalBalce}</Text>
          </View>
          <View>
            <Text style={styles.spent}>Spent money</Text>
            <Text style={styles.amountSpend}>${userState?.totalExpence}</Text>
          </View>

          <Image
            source={require("../../../assets/atmchip.png")}
            style={styles.chip}
          />

          <Image
            source={require("../../../assets/circle.png")}
            style={styles.circle}
          />
          <Image
            source={require("../../../assets/half.png")}
            style={{
              ...styles.circle,
              top: scale(30),
              height: scale(80),
              right: scale(-150),
            }}
          />

          <Image
            source={require("../../../assets/cut.png")}
            style={{
              ...styles.circle,
              top: scale(0),
              height: scale(50),
              left: scale(-55),
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default ATMCard;
const styles = StyleSheet.create({
  container: {
    width: scale(310),
    alignSelf: "center",
    height: scale(160),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    borderRadius: scale(10),
    objectFit: "cover",
    overflow: "hidden",
  },
  imageBg: {
    width: scale(310),
    height: scale(180),
    resizeMode: "cover",
    alignSelf: "center",
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  contentContainer: {
    width: scale(200),
    justifyContent: "space-evenly",
    // height: scale(160),
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
    gap: scale(35),
  },
  total: {
    color: Color.White,
    fontFamily: "Medium",
    fontSize: scale(14),
  },
  amount: {
    color: Color.White,
    fontFamily: "Bold",
    fontSize: scale(28),
    paddingVertical: scale(3),
  },
  spent: {
    color: Color.White,
    fontFamily: "Medium",
    fontSize: scale(12),
  },
  amountSpend: {
    color: Color.White,
    fontFamily: "Bold",
    fontSize: scale(20),
  },
  chip: {
    position: "absolute",
    right: scale(-80),
    width: scale(50),
    height: scale(50),
    resizeMode: "contain",
    top: scale(15),
  },
  circle: {
    position: "absolute",
    right: scale(-120),
    width: scale(120),
    height: scale(120),
    resizeMode: "contain",
    top: scale(60),
  },
});
