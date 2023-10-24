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
import { Fontisto, Ionicons } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "../../Components/GradientButton";
import { textInputContainer } from "../../Components/CustomStyle";
import Color from "../../../assets/colors/Color";

const height = Dimensions.get("screen").height;

let data = [
  { label: "Eating out", id: 1 },
  { label: "Groceries", id: 2 },
  { label: "Electronics  ", id: 3 },
  { label: "Clothes", id: 4 },
  { label: "Education", id: 5 },
  { label: "Shopping", id: 6 },
  { label: "Transport", id: 7 },
  { label: "Digital", id: 8 },
  { label: "Medicine", id: 9 },
  { label: "Finance", id: 10 },
  { label: "Insurance", id: 11 },
  { label: "Housing", id: 12 },
  { label: "Entertainment", id: 13 },
];

const AddCategoryModal = ({
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
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item) => {
    // console.log(item, "item");
    const updatedData = data.map((d) =>
      d.id === item.id ? { ...d, isSelected: !d.isSelected } : d
    );
    setSelectedItem(item.label);
    data = updatedData;
    // setmodalVisibal(false);
  };

  // console.log(selectedItem, "in parent");

  const handleContinue = () => {
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
          {selectedItem !== "" ? (
            <View style={styles.selectedItemContainer}>
              <View>
                <Text style={styles.title}>Select Method</Text>
              </View>
              <View style={textInputContainer}>
                <Text style={styles.titleSelected}>{selectedItem}</Text>
              </View>

              <GradientButton
                title="Continue"
                onPress={handleContinue}
                containerStyle={styles.gradientButton}
              />
            </View>
          ) : (
            <View>
              <View style={styles.topContainer}>
                <Text style={styles.title}>Select Method</Text>
                <View style={styles.buttonContainer}>
                  <LinearGradient
                    colors={["#163DA7", "#C66DB4"]}
                    start={{ x: 0.55, y: 0.77 }}
                    end={{ x: 0.11, y: 0.55 }}
                    style={styles.gradientBackground}
                  >
                    <Ionicons name="add" style={styles.methodIcon} />
                    <Text style={styles.methodTitle}>Add New Category</Text>
                  </LinearGradient>
                </View>
              </View>
              <View style={styles.model}>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()} // Convert id to string
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;

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
    width: scale(320),
    alignSelf: "center",
    height: scale(200),
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
    paddingHorizontal: scale(2),
    paddingVertical: scale(5),
    position: "relative",
    // top: scale(6),
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: scale(300),
    position: "relative",
    top: scale(-17),
  },
  buttonContainer: {
    flexDirection: "row",
  },
  gradientBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(6),
    borderRadius: scale(40),
    width: scale(150),
    gap: scale(6),
    paddingHorizontal: scale(6),
  },
  methodIcon: {
    color: Color.White,
    fontSize: scale(17),
  },
  methodTitle: {
    fontFamily: "Medium",
    fontSize: scale(12),
    color: Color.White,
  },
  itemText: {
    backgroundColor: Color.Bg,
    width: scale(88),
    textAlign: "center",
    paddingVertical: scale(8),
    borderRadius: scale(10),
    marginHorizontal: scale(5),
  },
  selectedItemContainer: {
    position: "relative",
    top: scale(-50),
  },
  titleSelected: {
    paddingVertical: scale(8),
  },
  gradientButton: {
    width: scale(240),
    alignSelf: "center",
    marginTop: scale(20),
  },
});
