import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { AntDesign } from "react-native-vector-icons";
import { scale } from "react-native-size-matters";
import { useUserState } from "../Slices/userSlice";
import Color from "../../assets/colors/Color";
import { useNavigation } from "@react-navigation/native";
const Height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const ExpenceIncome = () => {
  const userState = useUserState();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={{ ...styles.card, backgroundColor: "#FADEF4" }}
          onPress={() => navigation.navigate("ExpenseReport")}
        >
          <View>
            <Image
              source={require("../../assets/bill.png")}
              style={styles.bagImage}
            />
          </View>
          <View style={styles.centerContainer}>
            <Text style={styles.expenceTitle}>Expense</Text>
            <Text style={styles.expenceAmount}>${userState?.totalExpence}</Text>
          </View>
          <View>
            <AntDesign name='rightcircle' style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("IncomeReport")}
        >
          <View>
            <Image
              source={require("../../assets/money-bag.png")}
              style={styles.bagImage}
            />
          </View>
          <View style={styles.centerContainer}>
            <Text style={styles.expenceTitle}>Income</Text>
            <Text style={styles.expenceAmount}>${userState?.totalIncome}</Text>
          </View>
          <View>
            <AntDesign name='rightcircle' style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Personal Saving Goal */}

      <View style={styles.personalContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SavingReport")}
          style={styles.personal}
        >
          <Image
            source={require("../../assets/saveing.png")}
            style={styles.bagImage}
          />
          <View style={styles.centerContainer}>
            <Text style={{ ...styles.expenceTitle, color: Color.White }}>
              Personal Saving Goal
            </Text>
            <Text style={{ ...styles.expenceAmount, color: Color.White }}>
              ${userState?.saveingPlan}
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <AntDesign
            name='rightcircle'
            style={{ fontSize: 22, color: Color.White }}
          />
        </View>
      </View>
    </View>
  );
};

export default ExpenceIncome;

const styles = StyleSheet.create({
  container: {
    // height: Height * 0.18,
    width: width * 0.9,
    alignSelf: "center",
    // alignItems: "center",
    gap: width * 0.04,
  },
  card: {
    width: "48%",
    borderRadius: Height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    backgroundColor: "rgba(22, 61, 167, 0.17)",
  },
  bagImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  centerContainer: {
    flexDirection: "row",
    gap: 6,
  },
  centerContainer: {
    flexDirection: "column",
    gap: 4,
  },
  expenceTitle: {
    fontFamily: "Medium",
    fontSize: scale(13),
  },
  expenceAmount: {
    fontFamily: "Bold",
    fontSize: scale(16),
  },
  icon: {
    fontSize: 18,
    color: "rgba(22, 61, 167, 0.17)",
    paddingLeft: 10,
  },
  personalContainer: {
    backgroundColor: Color.Blue,
    borderRadius: Height * 0.01,
    paddingHorizontal: scale(12),
    paddingVertical: scale(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  personal: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
