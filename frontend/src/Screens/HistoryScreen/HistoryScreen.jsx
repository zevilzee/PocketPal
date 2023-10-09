import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import BottomTab from "../../Components/BottomTab";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import DurationCard from "./DurationCard";
import StartEndTime from "./StartEndTime";
import ItemsTable from "./HistoryTable/ItemsTable";
import Icon from "../../../assets/pdfW.png";
import ModalDuration from "./ModalDuration";

const HistoryScreen = () => {
  const [modalVisibal, setmodalVisibal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  console.log(selectedItem);
  return (
    <View style={styles.container}>
      <HeaderTitle title="Income history" />
      <View style={styles.historyCard}>
        <DurationCard modal={setmodalVisibal} selectedItem={selectedItem} />
        <StartEndTime />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemsTable />
      </ScrollView>

      <ModalDuration
        visibal={modalVisibal}
        setmodalVisibal={setmodalVisibal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

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
