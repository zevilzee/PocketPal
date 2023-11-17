import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useUserState, useUserStateActions } from "../Slices/userSlice";
import Color from "../../assets/colors/Color";
import { BASE_URL } from "../../CONSTANTS";
import FinanaceGoalItemDetails from "./FinanaceGoalItemDetails";
import AppBottomTab from "./AppBottomTab";
// const data = [
//   {
//     itemName: "Item 1",
//     totalAmount: 1000,
//     savedAmount: 900,
//   },
//   {
//     itemName: "Item 2",
//     totalAmount: 2000,
//     savedAmount: 550,
//   },
//   {
//     itemName: "Item 3",
//     totalAmount: 1500,
//     savedAmount: 300,
//   },
//   {
//     itemName: "Item 3",
//     totalAmount: 1500,
//     savedAmount: 600,
//   },
//   {
//     itemName: "Item 5",
//     totalAmount: 1500,
//     savedAmount: 300,
//   },
//   {
//     itemName: "Item 6",
//     totalAmount: 1500,
//     savedAmount: 300,
//   },
// ];

const SaveingReportDetails = ({ incomeDetails }) => {
  const userState = useUserState();
  const userActions = useUserStateActions();

  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [totalValue, settotalValue] = useState(null);
  const [loading, setloading] = useState(false);
  const handleAddGoal = () => {
    navigation.navigate("AddGoal");
  };
  const fetchFinance = async () => {
    setloading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/finance/getFinance/${userState.id}`
      );

      const target = res?.data?.data?.map((item) => Number(item?.Goalamount));
      const totalValue = target.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );

      setdata(res?.data?.data);
      settotalValue(totalValue);
      incomeDetails(totalValue);
      userActions.setsaveingPlan(totalValue);

      setloading(false);
    } catch (error) {
      console.log(error, "error while fetching Finance");
    }
  };
  useEffect(() => {
    fetchFinance();
  }, []);

  console.log(totalValue);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.goalsList}>
          <Text style={styles.title}>Saving Details</Text>
          {loading ? (
            <View
              style={{
                flex: 1,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size='large' color={Color.Blue} />
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <FinanaceGoalItemDetails data={item} />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default SaveingReportDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
  },
  contentContainer: {
    backgroundColor: Color.White,
    flex: 1,
    position: "relative",
    bottom: scale(10),
    borderTopRightRadius: scale(14),
    borderTopLeftRadius: scale(14),
    // paddingVertical: scale(23),
  },
  goalsList: {
    paddingVertical: scale(10),
    flex: 1,
  },
  title: {
    paddingHorizontal: scale(20),
    fontFamily: "Bold",
    fontSize: scale(16),
    paddingVertical: scale(10),
    alignSelf: "center",
  },
  bottomContainer: {
    backgroundColor: Color.White,
    position: "absolute",
    bottom: scale(-10),
    width: "100%",
  },
});
