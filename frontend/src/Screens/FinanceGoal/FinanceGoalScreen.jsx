import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import SaveingPlanBalance from "../../Components/SaveingPlanBalance";
import FinanaceGoalItemDetails from "../../Components/FinanaceGoalItemDetails";
import BottomTab from "../../Components/BottomTab";
import Icon from "../../../assets/add.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useUserState, useUserStateActions } from "../../Slices/userSlice";
import { BASE_URL } from "../../../CONSTANTS";
import { useFocusEffect } from "@react-navigation/native";
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

const FinanceGoalScreen = () => {
  const userState = useUserState();
  const userActions = useUserStateActions();

  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [totalValue, settotalValue] = useState(null);
  const [loading, setloading] = useState(false);
  const handleAddGoal = () => {
    navigation.navigate("AddGoal");
  };

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const fetchFinance = async () => {
        setloading(true);
        try {
          const res = await axios.get(
            `${BASE_URL}/finance/getFinance/${userState.id}`
          );

          if (isMounted) {
            const target = res?.data?.data?.map((item) =>
              Number(item?.Goalamount)
            );
            const totalValue = target.reduce(
              (acc, currentValue) => acc + currentValue,
              0
            );

            setdata(res?.data?.data);
            settotalValue(totalValue);
            userActions.setsaveingPlan(totalValue);

            setloading(false);
          }
        } catch (error) {
          console.log(error, "error while fetching Finance");
          if (isMounted) {
            setloading(false);
          }
        }
      };

      fetchFinance();

      return () => {
        isMounted = false;
      };
    }, [userState.id])
  );

  return (
    <View style={styles.container}>
      <HeaderTitle title='FINANCIAL GOALS' />

      <View style={styles.contentContainer}>
        <SaveingPlanBalance loading={loading} totalValue={totalValue} />

        <View style={styles.goalsList}>
          <Text style={styles.title}>Saving goals</Text>
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

        <View style={styles.bottomContainer}>
          <BottomTab
            title='Create new bill'
            image={Icon}
            onpress={handleAddGoal}
          />
        </View>
      </View>
    </View>
  );
};

export default FinanceGoalScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Color.White,
    flex: 1,
    position: "relative",
    bottom: scale(10),
    borderTopRightRadius: scale(14),
    borderTopLeftRadius: scale(14),
    paddingVertical: scale(23),
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
  },
  bottomContainer: {
    backgroundColor: Color.White,
    position: "absolute",
    bottom: scale(-10),
    width: "100%",
  },
});
