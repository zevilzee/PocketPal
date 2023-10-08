import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import BottomTab from "../../Components/BottomTab";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import DurationCard from "./DurationCard";
import StartEndTime from "./StartEndTime";
import ItemsTable from "./HistoryTable/ItemsTable";
import Icon from "../../../assets/pdfW.png";

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle title="Income history" />
      <View style={styles.historyCard}>
        <DurationCard />
        <StartEndTime />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemsTable />
      </ScrollView>

      <BottomTab title="PDF" image={Icon} />
    </View>
  );
};

export default HistoryScreen;

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
