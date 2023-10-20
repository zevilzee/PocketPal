import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import { Fontisto } from "react-native-vector-icons";

const height = Dimensions.get("screen").height;

let data = [
  { label: "All", isSelected: false, id: 1 },
  { label: "This Month", isSelected: false, id: 2 },
  { label: "Single Day", isSelected: false, id: 3 },
  { label: "Last Week", isSelected: false, id: 4 },
  { label: "Last Month", isSelected: false, id: 5 },
  // { label: "Date Range", isSelected: false, id: 6 },
];

const ModalDuration = ({
  setmodalVisibal,
  visibal,
  setSelectedItem,
  getHistory,
}) => {
  const handleItemPress = (item) => {
    const updatedData = data.map((d) =>
      d.id === item.id ? { ...d, isSelected: !d.isSelected } : d
    );
    setSelectedItem(item.label);
    getHistory(item.label);
    data = updatedData;
    setmodalVisibal(false);
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        style={styles.itemContainer}
      >
        <Text style={styles.itemText}>{item.label}</Text>
        {item.isSelected ? (
          <Fontisto name="radio-btn-active" style={styles.selectedIcon} />
        ) : (
          <Fontisto name="radio-btn-passive" style={styles.unselectedIcon} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visibal}
      transparent={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setmodalVisibal(!visibal);
      }}
    >
      <View style={styles.modelcontainer}>
        <View style={styles.ConfrmModel}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select history duration</Text>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => setmodalVisibal(false)}
            >
              <Image
                source={require("../../../assets/cross.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.model}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()} // Convert id to string
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDuration;

const styles = StyleSheet.create({
  modelcontainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: height,
    zIndex: 600,
  },
  ConfrmModel: {
    backgroundColor: Color.White,
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
    height: scale(300),
    bottom: scale(-10),
    position: "absolute",
    width: "100%",
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    alignItems: "center",
    justifyContent: "center",
  },
  model: {
    backgroundColor: Color.Bg,
    width: scale(320),
    alignSelf: "center",
    height: scale(200),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
    top: scale(18),
    width: scale(320),
    right: scale(20),
    gap: scale(55),
    justifyContent: "center",
  },
  imageContainer: {
    position: "absolute",
    right: scale(5),
  },
  image: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Medium",
    fontSize: scale(16),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    position: "relative",
    top: scale(10),
  },
  selectedIcon: {
    fontSize: scale(12),
    color: Color.Blue,
  },
  unselectedIcon: {
    fontSize: scale(12),
  },
  itemText: {
    fontSize: scale(12),
  },
});
