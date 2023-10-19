import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TableDesign from "./Table";

const ItemsTable = ({ data }) => {
  return (
    <View>
      <TableDesign data={data} />
    </View>
  );
};

export default ItemsTable;

const styles = StyleSheet.create({});
