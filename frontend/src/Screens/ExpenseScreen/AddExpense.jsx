import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { scale } from "react-native-size-matters";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "react-native-vector-icons";
import HeaderTitle from "../../Components/HeaderTitle";
import GradientButton from "../../Components/GradientButton";
import IncomeMethodModal from "../IncomeScreen/CashIn/IncomeMethodModal";
import Color from "../../../assets/colors/Color";
import { textInputContainer } from "../../Components/CustomStyle";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../../CONSTANTS";
import { useUserState, useUserStateActions } from "../../Slices/userSlice";
import { useStateContext } from "../../context/ContextProvider";

const AddExpense = () => {
  const navigation = useNavigation();
  const [modalVisibal, setmodalVisibal] = useState(false);
  const userStateActions = useUserStateActions();

  const [selectedItem, setSelectedItem] = useState("");
  const [selected, setselected] = useState("");
  const [selectUnPaid, setselectUnPaid] = useState("");
  const userState = useUserState();
  const [name, setname] = useState("");
  const [amount, setamount] = useState("");
  const { expenceCategory, setexpenceCategory } = useStateContext();

  // console.log(selectedItem, "selected item");

  const handleSave = () => {
    if (!name || !amount || !expenceCategory || !selected) {
      Alert.alert("All fileds required");
      return;
    }
    axios
      .post(`${BASE_URL}/expense/create-expense`, {
        name: `${name}`,
        category: `${expenceCategory}`,
        user: userState.id,
        amount: `${amount}`,
        status: `${selected}`,
      })
      .then((res) => {
        console.log(res.data);
        Alert.alert("Expense added successfully");
        const newBalance = parseInt(userState.Balance) - parseInt(amount);
        useUserStateActions.setbalance(newBalance.toString());
      })

      .catch((e) => {
        console.log(e);
      });
  };
  const handleAddCategory = () => {
    navigation.navigate("AddCategory");
  };

  const handleSelectPaid = () => {
    setselected("paid");
  };
  const handleSelectUnPaid = () => {
    setselected("unpaid");
  };

  return (
    <View style={styles.container}>
      <HeaderTitle title="ADD NEW EXPENSE" />
      <View style={styles.formContainer}>
        <View style={{ marginTop: scale(20) }}>
          <View style={textInputContainer}>
            <Text>$</Text>
            <TextInput
              placeholder="Enter amount"
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={(text) => setamount(text)}
            />
          </View>

          <View style={textInputContainer}>
            <TouchableOpacity style={styles.method} onPress={handleAddCategory}>
              <View style={styles.addContainer}>
                <Text style={styles.title}>
                  {expenceCategory !== ""
                    ? `${expenceCategory}`
                    : "Add Category"}
                </Text>
              </View>
              <View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={textInputContainer}>
            {/* <View style={styles.method}> */}
            <TextInput
              placeholder="Enter Details"
              onChangeText={(text) => setname(text)}
              // style={styles.textInput}
            />
            {/* <MaterialIcons name="keyboard-voice" style={{ ...styles.icon }} /> */}
            {/* </View> */}
          </View>

          <View style={styles.status}>
            <TouchableOpacity
              style={styles.paidContainer}
              onPress={handleSelectPaid}
            >
              <Text style={styles.paidTitle}>Paid</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.unpaidContainer}
              onPress={handleSelectUnPaid}
            >
              <Text style={styles.paidTitle}>Unpaid</Text>
            </TouchableOpacity>
          </View>
          {/* 
          <View style={{ flexDirection: "row", gap: scale(14) }}>
            <View style={[textInputContainer, styles.dateContainer]}>
              <View
                style={{
                  flexDirection: "row",
                  gap: scale(10),
                  paddingVertical: scale(6),
                }}
              >
                <FontAwesome
                  name="calendar"
                  style={{ ...styles.icon, color: Color.Blue }}
                />
                <Text>17 Sep, 2023 </Text>
              </View>
            </View>
            <View style={[textInputContainer, styles.dateContainer]}>
              <AntDesign
                name="clockcircle"
                style={{ ...styles.icon, color: Color.Blue }}
              />
              <Text>07:28PM</Text>
            </View>
          </View> */}

          {/* <View style={{ flexDirection: "row", gap: scale(14) }}>
            <View style={[textInputContainer, styles.dateContainer]}>
              <View
                style={{
                  flexDirection: "row",
                  gap: scale(10),
                  paddingVertical: scale(6),
                }}
              >
                <Entypo
                  name="camera"
                  style={{ ...styles.icon, color: Color.Blue }}
                />
                <Text>Photos</Text>
              </View>
            </View>
            <View style={[textInputContainer, styles.dateContainer]}>
              <Text>Add Bill No.</Text>
            </View>
          </View> */}

          <GradientButton
            title="Save"
            onPress={handleSave}
            containerStyle={styles.gradientButton}
          />

          <IncomeMethodModal
            visibal={modalVisibal}
            setmodalVisibal={setmodalVisibal}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </View>
      </View>
    </View>
  );
};

export default AddExpense;

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
    paddingHorizontal: scale(15),
  },

  method: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: scale(8),
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
  dateContainer: {
    width: scale(153),
  },
  gradientButton: {
    width: scale(210),
    alignSelf: "center",
    marginVertical: scale(22),
  },
  status: {
    flexDirection: "row",
    width: scale(230),
    gap: scale(12),
  },
  paidContainer: {
    paddingVertical: scale(7),
    borderRadius: scale(15),
    borderWidth: 0.4,
    backgroundColor: "green",
    width: scale(70),
    alignItems: "center",
  },
  unpaidContainer: {
    paddingVertical: scale(7),
    borderRadius: scale(15),
    borderWidth: 0.4,
    backgroundColor: "red",
    width: scale(70),
    alignItems: "center",
  },
  paidTitle: {
    fontFamily: "Bold",
    fontSize: scale(12),
    color: Color.White,
  },
  unpaidTitle: {
    fontFamily: "Bold",
    fontSize: scale(12),
    // color: Color.White,
  },
});

// 526335
