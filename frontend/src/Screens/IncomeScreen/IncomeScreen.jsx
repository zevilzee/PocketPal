import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import HistoryCard from "./HistoryCard";
import { scale } from "react-native-size-matters";
import SearchInput from "./SearchInput";
import Color from "../../../assets/colors/Color";
import IncomeDetails from "./IncomeDetails";
import expenseData from "./Data";
import BottomTab from "../../Components/BottomTab";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { useUserState } from "../../Slices/userSlice";
import axios from "axios";
import { BASE_URL } from "../../../CONSTANTS";
import { formatCustomDate } from "../../Utiles/GetData";

const IncomeScreen = () => {
  const navigation = useNavigation();
  const userState = useUserState();
  const totalBalce = userState?.totalIncome - userState?.totalExpence;

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
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

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

  const handleFilter = () => {};
  return (
    <View style={styles.container}>
      <HeaderTitle title='Income' />
      <View style={styles.historyCard}>
        <HistoryCard todayIncome={todayIncome} />
      </View>
      <SearchInput filter={handleFilter} screen='' />
      <FlatList
        data={groupedExpenseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <IncomeDetails data={item} />}
      />
      <BottomTab title='Cash In' onpress={handleCashIn} />
    </View>
  );
};

export default IncomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  historyCard: {
    alignSelf: "center",
    position: "relative",
    top: scale(-18),
  },
});
