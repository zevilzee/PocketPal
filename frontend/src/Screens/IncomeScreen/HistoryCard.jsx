import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import { Fontisto } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserState } from "../../Slices/userSlice";

const HistoryCard = ({ todayIncome }) => {
  const navigation = useNavigation();
  const userState = useUserState();
  const totalBalce = userState?.totalIncome - userState?.totalExpence;
  const handleHistoryNavigation = () => {
    navigation.navigate("History");
  };
  const incomeToday = todayIncome.map((item) => item.totalAmount);

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.title}>${totalBalce}</Text>
        <View style={styles.row}>
          <Text style={styles.subTitle}>Cash in Hand</Text>
        </View>
      </View>
      <View style={styles.line}></View>

      <View style={styles.container}>
        <Text style={styles.title}>${incomeToday[0]}</Text>
        <View style={styles.row}>
          <Text style={styles.subTitle}>Todays Income</Text>
        </View>
      </View>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.container}
        onPress={handleHistoryNavigation}
      >
        <Fontisto name='history' style={styles.icon} />
        <View style={styles.row}>
          <Text style={styles.subTitle}>History</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryCard;
const styles = StyleSheet.create({
  card: {
    width: scale(321),
    backgroundColor: Color.White,
    borderRadius: scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scale(18),
    elevation: 3,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: scale(18),
    fontFamily: "Bold",
    color: Color.Blue,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: scale(1),
    height: scale(35),
    backgroundColor: "#828282",
  },
  subTitle: {
    fontSize: scale(10),
    fontFamily: "Regular",
    color: Color.Black,
  },
  icon: {
    fontSize: scale(18),
    color: "#FF5E5E",
    paddingVertical: scale(2),
  },
});
