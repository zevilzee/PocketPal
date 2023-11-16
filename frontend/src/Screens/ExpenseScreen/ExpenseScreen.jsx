import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";

import { scale } from "react-native-size-matters";

import { useNavigation } from "@react-navigation/core";
import HeaderTitle from "../../Components/HeaderTitle";
import HistoryCard from "../IncomeScreen/HistoryCard";
import SearchInput from "../IncomeScreen/SearchInput";
import expenseData from "../IncomeScreen/Data";
import BottomTab from "../../Components/BottomTab";
import Color from "../../../assets/colors/Color";
import ExpenseDetails from "./ExpenseDetails";
import Icon from "../../../assets/add.png";
import FilterModal from "./FilterModal";
import HIstoryCardExpence from "../../Components/HIstoryCardExpence";
import { useUserState } from "../../Slices/userSlice";
import axios from "axios";
import { BASE_URL } from "../../../CONSTANTS";
import { useUserStateActions } from "../../Slices/userSlice";
import { formatCustomDate } from "../../Utiles/GetData";
const bills = [
  {
    description: "Electricity Bill",
    date: "WED, 17 SEP, 2023 01:44PM",
    amount: 320,
    status: "Paid",
  },
  {
    description: "Water Bill",
    date: "FRI, 21 SEP, 2023 03:15PM",
    amount: 50,
    status: "Unpaid",
  },
  {
    description: "Internet Bill",
    date: "MON, 25 SEP, 2023 09:30AM",
    amount: 80,
    status: "Paid",
  },
  {
    description: "Gas Bill",
    date: "THU, 28 SEP, 2023 11:22AM",
    amount: 60,
    status: "Unpaid",
  },
];
const ExpenseScreen = () => {
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
        console.log(res.data);
        setData(res.data);
        const newBalance = parseInt(userState.Balance) - parseInt(amount);
        userStateActions.setbalance(newBalance.toString());
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

  return (
    <View style={styles.container}>
      <HeaderTitle title='EXPENSE' />
      <View style={styles.historyCard}>
        <HIstoryCardExpence todayExpense={todayIncome[0]?.totalAmount} />
      </View>
      <SearchInput
        filter={handleFilter}
        screen='EXPENSE'
        modalVisible={setmodalVisibal}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ExpenseDetails data={item} />}
      />

      <FilterModal
        visibal={modalVisibal}
        setmodalVisibal={setmodalVisibal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <BottomTab
        title='Create new bill'
        image={Icon}
        onpress={handleCreateBill}
      />
    </View>
  );
};

export default ExpenseScreen;

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
