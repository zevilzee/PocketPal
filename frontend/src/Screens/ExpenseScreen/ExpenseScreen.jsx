import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

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
  return (
    <View style={styles.container}>
      <HeaderTitle title="EXPENSE" />
      <View style={styles.historyCard}>
        <HistoryCard />
      </View>
      <SearchInput
        filter={handleFilter}
        screen="EXPENSE"
        modalVisible={setmodalVisibal}
      />
      <FlatList
        data={bills}
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
        title="Create new bill"
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
