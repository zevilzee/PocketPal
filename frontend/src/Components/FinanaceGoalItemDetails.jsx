import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";
import * as Progress from "react-native-progress";

const FinanaceGoalItemDetails = ({ data }) => {
  const completionPercentage = Math.floor(
    (data?.savedAmount / data?.totalAmount) * 100
  );

  const getColorForPercentage = (percentage) => {
    if (percentage <= 25) {
      return "red";
    } else if (percentage <= 50) {
      return "yellow";
    } else {
      return "green";
    }
  };

  const progressBarColor = getColorForPercentage(completionPercentage);

  return (
    <View style={styles.container}>
      <View style={styles.entries}>
        <View>
          <View style={styles.contentContainer}>
            <Text>{data?.itemName}</Text>
            <Text>{data?.itemName}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text>Goal Amount</Text>
            <Text>$500</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text>Amount Saved</Text>
            <Text>$700</Text>
          </View>
          <View style={styles.contentContainer}>
            <Progress.Bar
              progress={completionPercentage / 100}
              color={progressBarColor}
              width={290}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text>Progress</Text>
            <Text>{completionPercentage}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FinanaceGoalItemDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
    // flex: 1,
  },
  entries: {
    backgroundColor: Color.Bg,

    // gap: scale(10),
    paddingVertical: scale(10),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingVertical: scale(4),
  },
});
