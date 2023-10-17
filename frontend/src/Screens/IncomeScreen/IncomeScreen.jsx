import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import HistoryCard from "./HistoryCard";
import { scale } from "react-native-size-matters";
import SearchInput from "./SearchInput";
import Color from "../../../assets/colors/Color";
import IncomeDetails from "./IncomeDetails";
import expenseData from "./Data";
import BottomTab from "../../Components/BottomTab";
import { useNavigation } from "@react-navigation/core";
const IncomeScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCashIn = () => {
    navigation.navigate("CashIn");
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`${BASE_URL}/demeUrl`);
  //       setData(res.data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const handleFilter = () => {};
  return (
    <View style={styles.container}>
      <HeaderTitle title="Income" />
      <View style={styles.historyCard}>
        <HistoryCard />
      </View>
      <SearchInput filter={handleFilter} screen="" />
      <FlatList
        data={expenseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <IncomeDetails data={item} />}
      />
      <BottomTab title="Cash In" onpress={handleCashIn} />
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
