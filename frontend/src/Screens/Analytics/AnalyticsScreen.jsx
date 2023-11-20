import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { ProgressChart } from "react-native-chart-kit";
import { useUserState } from "../../Slices/userSlice";
import * as Progress from "react-native-progress";
import ExpenceIncome from "../../Components/ExpenceIncome";
import AppBottomTab from "../../Components/AppBottomTab";

const Height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const AnalyticsScreen = () => {
  const userState = useUserState();
  const [loading, setloading] = useState(false);
  const [remainingPercentagee, setremainingPercentagee] = useState(undefined);
  const [percent, setpercent] = useState("");
  const [left, setleft] = useState(
    userState?.totalIncome - userState?.totalExpence
  );

  const [expencePercentage, setexpencePercentage] = useState("");
  useEffect(() => {
    const calculate = async () => {
      setloading(true);
      try {
        let remainingPercentage;
        if (userState?.totalIncome === 0) {
          setremainingPercentagee(0.01);
          // setexpencePercentage(0.1);
          setloading(false);
          return;
        } else {
          remainingPercentage = Math.floor(
            ((userState?.totalIncome - userState?.totalExpence) /
              userState?.totalIncome) *
              100
          );
          const expensePercentage = Math.floor(
            (userState?.totalExpence / userState?.totalIncome) * 100
          );

          setexpencePercentage(expensePercentage);
          setpercent(remainingPercentage);
          const percentage = remainingPercentage / 100;
          setremainingPercentagee(percentage);
        }
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    calculate();
  }, []);
  const data = {
    data: [remainingPercentagee || 0.1],
  };
  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 0.3) => `rgba(22, 61, 167, ${opacity})`,
  };

  const getColorForPercentage = (percentage) => {
    if (expencePercentage <= 25) {
      return "red";
    } else if (expencePercentage <= 50) {
      return "yellow";
    } else {
      return "green";
    }
  };

  const completionPercentage =
    (userState?.totalExpence /
      userState?.totalIncome /
      userState?.totalExpence) *
    100;
  const progressBarColor = getColorForPercentage(completionPercentage);

  return (
    <View style={styles.content}>
      <HeaderTitle title='Analytics' />
      <View style={styles.contentContainer}>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={Color.Blue} />
          </View>
        ) : (
          <View>
            <Text></Text>
            <ProgressChart
              data={data}
              width={width * 0.99}
              height={220}
              strokeWidth={16}
              radius={80}
              chartConfig={chartConfig}
              hideLegend={true}
              // style={{ backgroundColor: "red" }}
            />
            <View style={styles.totalBudgetContainer}>
              <Text style={styles.totalTitle}>Total Budget</Text>
              <Text style={styles.totalAmount}>${userState?.totalIncome}</Text>
            </View>

            <View style={styles.monthlyBudhet}>
              <Text style={styles.budgetTotal}>Monthly Budget</Text>
              <View style={styles.totalLeftContainer}>
                <Text style={styles.monthlyToal}>
                  ${userState?.totalIncome}
                </Text>
                <Image
                  source={require("../../../assets/moneyBag.png")}
                  style={styles.bagImage}
                />
              </View>
              <View>
                <Progress.Bar
                  progress={expencePercentage / 100}
                  color='green'
                  width={290}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: scale(6),
                }}
              >
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <Text style={styles.leftTitle}>
                    Spent ${userState?.totalExpence}
                  </Text>
                  <Text style={styles.leftTitle}>/</Text>
                  <Text style={styles.leftTitle}>{expencePercentage}%</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 3 }}>
                  <Text style={styles.leftTitle}>Left ${left}</Text>
                  <Text style={styles.leftTitle}>/</Text>
                  <Text style={styles.leftTitle}>{percent}%</Text>
                </View>
              </View>
            </View>
            <View>
              <ExpenceIncome />
            </View>
          </View>
        )}
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: Height * 0 - 105,
            zIndex: 100,
          }}
        >
          <AppBottomTab active='usere' />
        </View>
      </View>
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  content: {
    backgroundColor: Color.White,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Color.White,
    // flex: 1,
    bottom: scale(10),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  totalBudgetContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: Color.White,
    // shadowColor: Color.Black,
    // shadowOffset: {
    //   width: 9,
    //   height: 8,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 6.65,
    // elevation: 8,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderBottomWidth: 0.7,
    borderBottomColor: Color.Border,
    alignItems: "center",
  },
  totalTitle: {
    fontFamily: "Medium",
    fontSize: scale(11),
  },
  totalAmount: {
    fontFamily: "Bold",
    fontSize: scale(18),
    paddingVertical: scale(2),
  },
  monthlyBudhet: {
    backgroundColor: Color.White,
    shadowColor: Color.Black,
    shadowOffset: {
      width: 9,
      height: 8,
    },
    shadowOpacity: 0.27,
    shadowRadius: 6.65,
    elevation: 8,
    width: width * 0.9,
    alignSelf: "center",
    borderRadius: Height * 0.02,
    paddingHorizontal: width * 0.06,
    justifyContent: "space-evenly",
    // height: Height * 0.1,
    marginVertical: Height * 0.02,
  },
  bagImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  budgetTotal: {
    fontFamily: "Medium",
    fontSize: scale(14),
    paddingTop: scale(10),
  },
  monthlyToal: {
    fontFamily: "Bold",
    fontSize: scale(24),
  },
  leftTitle: {
    fontFamily: "Regular",
    fontSize: scale(10),
  },
  totalLeftContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
});
