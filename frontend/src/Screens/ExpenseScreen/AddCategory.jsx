import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import HeaderTitle from "../../Components/HeaderTitle";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Fontisto,
} from "react-native-vector-icons";
import { textInputContainer } from "../../Components/CustomStyle";
import AddCategoryModal from "./AddCategoryModal";
import { useStateContext } from "../../context/ContextProvider";

const data = [
  { label: "Eating out", id: 1 },
  { label: "Groceries", id: 2 },
  { label: "Electronics  ", id: 3 },
  { label: "Clothes", id: 4 },
  { label: "Education", id: 5 },
  { label: "Shopping", id: 6 },
];
const Width = Dimensions.get("screen").width;
const AddCategory = () => {
  const [modalVisibal, setmodalVisibal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { expenceCategory, setexpenceCategory } = useStateContext();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        style={styles.itemContainer}
      >
        <View style={styles.containerLeft}>
          {selectedItem === item?.label ? (
            <Fontisto name="radio-btn-active" style={styles.icon} />
          ) : (
            <Fontisto name="radio-btn-passive" style={styles.icon} />
          )}
          <Text style={styles.itemText}>{item.label}</Text>
        </View>
        <AntDesign name="delete" style={styles.icon} />
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item) => {
    const updatedData = data.map((d) =>
      d.id === item.id ? { ...d, isSelected: !d.isSelected } : d
    );
    setSelectedItem(item?.label);
    setexpenceCategory(item?.label);

    // data = updatedData;
    // setmodalVisibal(false);
  };
  return (
    <View style={styles.container}>
      <HeaderTitle title="Add Category" />
      <Text>AddCategory</Text>
      <View style={styles.formContainer}>
        <View
          style={{
            paddingHorizontal: scale(15),
          }}
        >
          <View style={textInputContainer}>
            <TouchableOpacity
              style={styles.method}
              onPress={() => setmodalVisibal(true)}
            >
              <View style={styles.addContainer}>
                <AntDesign
                  name="plus"
                  style={{
                    ...styles.icon,
                    fontSize: scale(13),
                    color: Color.Blue,
                  }}
                />
                <Text style={styles.title}>Add Category</Text>
              </View>
              <View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ ...textInputContainer, paddingVertical: -10 }}>
            <TouchableOpacity
              style={{ ...styles.method, paddingVertical: 0 }}
              //   onPress={() => setmodalVisibal(true)}
            >
              <View style={styles.addContainer}>
                <AntDesign
                  name="search1"
                  style={{
                    ...styles.icon,
                    fontSize: scale(13),
                    color: Color.Blue,
                  }}
                />
                <TextInput placeholder="Search" style={styles.inputContainer} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()} // Convert id to string
        />
      </View>
      <AddCategoryModal
        visibal={modalVisibal}
        setmodalVisibal={setmodalVisibal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  formContainer: {
    backgroundColor: Color.White,
    height: "100%",
    position: "relative",
    borderTopRightRadius: scale(25),
    top: scale(-22),
    borderTopLeftRadius: scale(15),
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
  },
  title: {
    fontFamily: "Medium",
    fontSize: scale(12),
    color: Color.Blue,
  },
  icon: {
    fontSize: scale(18),
  },
  method: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: scale(8),
  },
  inputContainer: {
    width: "90%",
    paddingVertical: scale(10),
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: scale(15),
    borderBottomColor: Color.Border,
    borderBottomWidth: 0.6,
    paddingVertical: scale(14),
  },
  containerLeft: {
    flexDirection: "row",
    gap: scale(20),
    alignItems: "center",
  },
});
