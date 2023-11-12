import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { moderateScale, s, verticalScale } from "react-native-size-matters";

import { AntDesign } from "react-native-vector-icons";
import Color from "../../assets/colors/Color";
import { formatCustomDate } from "../Utiles/GetData";

const HorizantalList = ({
  items,
  selectedItem,
  selectedIndex,
  setSelectedItem,
  centerSelected,
  setCenterSelected,
  setSelectedIndex,
  PickedDate,
  setendDate,
}) => {
  const flatListRef = useRef(null);
  const handleItemPress = (item, index) => {
    setSelectedItem(item.title);
    setCenterSelected(true);
    setSelectedIndex(index);
    console.log(item);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + item.id);
    let pickedDate = formatCustomDate(endDate);
    setendDate(endDate);
    PickedDate(pickedDate);

    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };
  useEffect(() => {
    if (centerSelected && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: selectedIndex,
        viewPosition: 0.5,
      });
    }
  }, [centerSelected, selectedIndex]);
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedItem === item.title && styles.selectedItem,
      ]}
      onPress={() => handleItemPress(item, index)}
    >
      <Text
        style={[
          styles.itemText,
          selectedItem === item.title && styles.selectedItemText,
        ]}
      >
        {item.title} Month
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        ref={flatListRef}
        initialScrollIndex={selectedIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  itemContainer: {
    paddingHorizontal: moderateScale(20),
    color: Color.Black,
    backgroundColor: Color.Bg,
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    marginLeft: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: Color.Blue,
  },
  itemText: {
    fontSize: s(15),
    fontFamily: "Regular",
  },
  selectedItemText: {
    fontFamily: "Medium",
    color: Color.White,
    fontSize: s(15),
  },
});

export default HorizantalList;
