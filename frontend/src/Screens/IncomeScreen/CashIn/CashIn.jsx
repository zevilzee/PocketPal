import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderTitle from "../../../Components/HeaderTitle";
import Color from "../../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { textInputContainer } from "../../../Components/CustomStyle";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "react-native-vector-icons";
import GradientButton from "../../../Components/GradientButton";
import IncomeMethodModal from "./IncomeMethodModal";
import axios from "axios";
import { BASE_URL } from "../../../../CONSTANTS";
import { useUserState, useUserStateActions } from "../../../Slices/userSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

const CashIn = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const userStateActions = useUserStateActions();
  const userState = useUserState();
  const [name, setname] = useState("");
  const [amount, setamount] = useState("");
  const [modalVisibal, setmodalVisibal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const handleSave = () => {
    axios
      .post(`${BASE_URL}/income/create-income`, {
        name: `${name}`,
        Method: `${selectedItem}`,
        user: userState.id,
        amount: `${amount}`,
      })
      .then((res) => {
        toast.show("Income added successfully", {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in ",
        });
        // Alert.alert("Income added successfully");
        setname("");
        setamount("");
        setSelectedItem("");
        const newBalance = parseInt(userState.Balance) + parseInt(amount);
        userStateActions.setBalance(newBalance.toString());
        navigation.goBack();
      })
      .catch((e) => {
        toast.show("Failed to add income. Please try again.", {
          type: "danger",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderTitle title='Income' />
      <View style={styles.formContainer}>
        <View style={{ marginTop: scale(20) }}>
          <View style={textInputContainer}>
            <Text>$</Text>
            <TextInput
              placeholder='Enter amount'
              style={styles.textInput}
              keyboardType='number-pad'
              value={amount}
              onChangeText={(text) => setamount(text)}
            />
          </View>

          <View style={textInputContainer}>
            <TouchableOpacity
              style={styles.method}
              onPress={() => setmodalVisibal(true)}
            >
              <View style={styles.addContainer}>
                <AntDesign
                  name='plus'
                  style={{
                    ...styles.icon,
                    fontSize: scale(13),
                    color: Color.Blue,
                  }}
                />
                <Text style={styles.title}>
                  {selectedItem !== ""
                    ? `${selectedItem}`
                    : "Select Income Methods"}
                </Text>
              </View>
              <View>
                <MaterialIcons
                  name='keyboard-arrow-right'
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={textInputContainer}>
            {/* <View style={styles.method}> */}
            <TextInput
              placeholder='Enter Details'
              value={name}
              onChangeText={(text) => setname(text)}
              // style={styles.textInput}
            />
            {/* <MaterialIcons name="keyboard-voice" style={{ ...styles.icon }} /> */}
            {/* </View> */}
          </View>

          {/* <View style={{ flexDirection: "row", gap: scale(14) }}>
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

          <GradientButton
            title='Save'
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

export default CashIn;

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
    marginVertical: scale(10),
  },
});
