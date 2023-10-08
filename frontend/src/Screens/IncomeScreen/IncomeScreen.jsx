import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import HistoryCard from "./HistoryCard";
import { scale } from "react-native-size-matters";
import SearchInput from "./SearchInput";
import Color from "../../../assets/colors/Color";
import IncomeDetails from "./IncomeDetails";
import expenseData from "./Data";
import BottomTab from "../../Components/BottomTab";
const IncomeScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle title="Income" />
      <View style={styles.historyCard}>
        <HistoryCard />
      </View>
      <SearchInput />
      <FlatList
        data={expenseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <IncomeDetails data={item} />}
      />
      <BottomTab title="Cash In" />
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
