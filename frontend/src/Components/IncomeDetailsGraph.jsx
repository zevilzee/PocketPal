import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useUserState } from "../Slices/userSlice";
import { formatCustomDate } from "../Utiles/GetData";
import { BASE_URL } from "../../CONSTANTS";
import IncomeDetails from "../Screens/IncomeScreen/IncomeDetails";
import Color from "../../assets/colors/Color";

const IncomeDetailsGraph = ({ incomeDetails }) => {
  const navigation = useNavigation();
  const userState = useUserState();

  const date = new Date();
  const currentDate = formatCustomDate(date);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const handleCashIn = () => {
    navigation.navigate("CashIn");
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/income/getIncome/${userState.id}`,
        {
          headers: {
            "auth-token": userState.token,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const groupedExpenses = {};

  data.forEach((expense) => {
    const date = formatCustomDate(expense.date);
    if (!groupedExpenses[date]) {
      groupedExpenses[date] = {
        timestamp: date,
        entries: [],
        totalAmount: 0,
        billNumber: 0,
      };
    }
    groupedExpenses[date].entries.push(expense);
    groupedExpenses[date].totalAmount += expense.amount;
    groupedExpenses[date].billNumber += 1;
  });

  const groupedExpenseData = Object.values(groupedExpenses);
  const todayIncome = groupedExpenseData.filter(
    (item) => item?.timestamp === currentDate
  );
  useEffect(() => {
    incomeDetails(todayIncome);
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.historyCard}></View>

      <FlatList
        data={groupedExpenseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <IncomeDetails data={item} />}
      />
    </View>
  );
};

export default IncomeDetailsGraph;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Color.White,
  },
  historyCard: {
    alignSelf: "center",
    position: "relative",
    top: scale(-18),
  },
});
