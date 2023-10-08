import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dummyData from "../Data";
import TableDesign from "./Table";

const ItemsTable = () => {
  return (
    <View>
      <TableDesign data={dummyData} />
    </View>
  );
};

export default ItemsTable;

const styles = StyleSheet.create({});
