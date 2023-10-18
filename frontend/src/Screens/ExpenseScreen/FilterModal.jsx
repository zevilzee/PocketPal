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
import { Fontisto } from "react-native-vector-icons";
import Color from "../../../assets/colors/Color";

const height = Dimensions.get("screen").height;

let data = [
  { label: "Most Recent", isSelected: false, id: 1 },
  { label: "Highest Amount", isSelected: false, id: 2 },
  { label: "Oldest", isSelected: false, id: 3 },
  { label: "Least Amount", isSelected: false, id: 4 },
];

const FilterModal = ({
  setmodalVisibal,
  visibal,
  selectedItem,
  setSelectedItem,
}) => {
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

  const handleItemPress = (item) => {
    const updatedData = data.map((d) =>
      d.id === item.id ? { ...d, isSelected: !d.isSelected } : d
    );
    setSelectedItem(item.label);
    data = updatedData;
    setmodalVisibal(false);
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

export default FilterModal;

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
    height: scale(250),
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
    height: scale(150),
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
