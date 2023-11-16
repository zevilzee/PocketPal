import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";
import * as Progress from "react-native-progress";
import { Feather } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/core";

const FinanaceGoalItemDetails = ({ data }) => {
  const navigation = useNavigation();
  const completionPercentage = Math.floor(
    (data?.Savedamount / data?.Goalamount) * 100
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

  const handleEditnavigation = (data) => {
    navigation.navigate("EditGoal", { data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.entries}>
        <View>
          <View style={styles.contentContainer}>
            <Text>{data?.purpose}</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => handleEditnavigation(data)}
            >
              <Feather name='edit' style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text>Goal Amount</Text>
            <Text>${data?.Goalamount}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text>Amount Saved</Text>
            <Text>${data?.Savedamount}</Text>
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
  editIcon: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(2),
  },
  icon: {
    fontSize: scale(16),
  },
});
