import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FeaturesCard from "../../Components/FeaturesCard";
import bill from "../../../assets/bill.png";
import goal from "../../../assets/goals.png";
import money from "../../../assets/money-bag.png";
import notification from "../../../assets/notification.png";
import analytics from "../../../assets/analytics.png";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const FeatureCardsHome = () => {
  const navigation = useNavigation();

  const handleIncome = () => {
    navigation.navigate("Income");
  };
  const handleExpense = () => {
    navigation.navigate("Expense");
  };
  const handleGoal = () => {
    navigation.navigate("FinanceGoal");
  };
  const handleAnalytics = () => {
    navigation.navigate("Analytics");
  };
  const handleNotifications = () => {};
  return (
    <View>
      <View style={styles.topFeature}>
        <FeaturesCard
          title='Income'
          image={money}
          style={"#EBF2FA"}
          onpress={handleIncome}
        />
        <FeaturesCard
          title='Expense'
          image={bill}
          style={"#FDDCAE"}
          onpress={handleExpense}
        />

        <FeaturesCard
          title='Financial Goal'
          image={goal}
          style={"#DDFFDF"}
          onpress={handleGoal}
        />
      </View>
      <View style={{ ...styles.topFeature, marginTop: scale(17) }}>
        <FeaturesCard
          title='Analytics and Visualization'
          image={analytics}
          onpress={handleAnalytics}
          style={"#DDEDED"}
        />

        <FeaturesCard
          title='Notifications'
          image={notification}
          style={"#FFE3F9"}
          onpress={handleNotifications}
        />
      </View>
    </View>
  );
};

export default FeatureCardsHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: Color.White,
    height: "100%",
    borderTopRightRadius: scale(12),
    borderTopLeftRadius: scale(12),
    position: "relative",
    top: scale(-15),
  },
  topFeature: {
    flexDirection: "row",
    gap: scale(14),
    width: scale(310),
    alignSelf: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Bold",
    paddingVertical: scale(10),
    left: scale(30),
    fontSize: scale(16),
  },
});
