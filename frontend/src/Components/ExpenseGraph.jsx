import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useUserState, useUserStateActions } from "../Slices/userSlice";
import { formatCustomDate } from "../Utiles/GetData";
import { BASE_URL } from "../../CONSTANTS";
import IncomeDetails from "../Screens/IncomeScreen/IncomeDetails";
import Color from "../../assets/colors/Color";
import ExpenseDetails from "../Screens/ExpenseScreen/ExpenseDetails";

const ExpenseGraph = ({ incomeDetails }) => {
  const userStateActions = useUserStateActions();
  const userState = useUserState();
  const [data, setData] = useState([]);
  const date = new Date();
  const currentDate = formatCustomDate(date);
  useEffect(() => {
    const fetchData = async () => {
      console.log(userState.id);
      try {
        const res = await axios.get(
          `${BASE_URL}/expense/getExpense/${userState.id}`,
          {
            headers: {
              "auth-token": userState.token,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();
  const [modalVisibal, setmodalVisibal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleCashIn = () => {
    navigation.navigate("CashIn");
  };

  const handleFilter = () => {};

  const handleCreateBill = () => {
    navigation.navigate("AddExpense");
  };

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

  const handleDelete = async (item) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/expense/delete-expense/${item}`,
        {
          headers: {
            "auth-token": userState.token,
          },
        }
      );
      console.log(res.data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.historyCard}></View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ExpenseDetails data={item} handleDelete={handleDelete} />
        )}
      />
    </View>
  );
};

export default ExpenseGraph;

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
