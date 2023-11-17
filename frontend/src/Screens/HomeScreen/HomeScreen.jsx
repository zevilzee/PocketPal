import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderHome from "./HeaderHome";
import NameHeader from "./NameHeader";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import ATMCard from "./ATMCard";
import { useFocusEffect } from "@react-navigation/native";

import { useUserState, useUserStateActions } from "../../Slices/userSlice";

import FeatureCardsHome from "./FeatureCardsHome";
import axios from "axios";
import { BASE_URL } from "../../../CONSTANTS";
import AppBottomTab from "../../Components/AppBottomTab";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const HomeScreen = () => {
  const userState = useUserState();
  const userActions = useUserStateActions();
  console.log(userState);
  const [loading, setloading] = useState(false);

  const fetchExpence = async () => {
    setloading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/expense/getExpense/${userState.id}`,
        {
          headers: {
            "auth-token": userState.token,
          },
        }
      );
      const target = res?.data?.map((item) => Number(item?.amount));
      const totalValue = target.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      userActions.settotalExpence(totalValue);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const fetchData = async () => {
    setloading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/income/getIncome/${userState.id}`,
        {
          headers: {
            "auth-token": userState.token,
          },
        }
      );
      const target = res?.data?.map((item) => Number(item?.amount));
      const totalValue = target.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      fetchExpence();
      userActions.settotalIncome(totalValue);
      setloading(false);
    } catch (error) {
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  const fetchDataOnFocus = async () => {
    fetchData();
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchDataOnFocus();

      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      <HeaderHome />
      <View></View>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Color.Blue} />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <NameHeader userName={userState?.fullName} />
          <ATMCard />
          <Text style={styles.title}>Features</Text>
          <FeatureCardsHome />
          <View
            style={{
              width: "100%",
              position: "absolute",
              bottom: screenHeight * 0.09,
              zIndex: 100,
            }}
          >
            <AppBottomTab active='home' />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: Color.White,
    height: "100%",
    borderTopRightRadius: scale(12),
    borderTopLeftRadius: scale(12),
    position: "relative",
    top: scale(-15),
  },
  title: {
    fontFamily: "Bold",
    paddingVertical: scale(10),
    left: scale(30),
    fontSize: scale(16),
  },
});
