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
import {useUserState} from "../../Slices/userSlice";
import axios from 'axios';
import {BASE_URL} from "../../../CONSTANTS";
const IncomeScreen = () => {
  const navigation = useNavigation();
  const userState = useUserState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data,setData] = useState([]);
  const handleCashIn = () => {
    navigation.navigate("CashIn");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(userState.token)
      try {
        const res = await axios.get(`${BASE_URL}/income/getIncome/${userState.id}`,{
         headers:{
          "auth-token": userState.token,
         }
        });
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error)
        setError(error);
      } finally {
        setLoading(false);
      }
    }

  fetchData();
  }, []);

  const handleFilter = () => {};
  return (
    <View style={styles.container}>
      <HeaderTitle title="Income" />
      <View style={styles.historyCard}>
        <HistoryCard />
      </View>
      <SearchInput filter={handleFilter} screen="" />
      <FlatList
        data={data}
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
