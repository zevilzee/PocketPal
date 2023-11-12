import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import AddGoalInput from "../../Components/AddGoalInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatCustomDate } from "../../Utiles/GetData";
import HorizantalList from "../../Components/HorizantalList";
import GradientButton from "../../Components/GradientButton";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
// import { useUserState, useUserStateActions } from "../../Slices/userSlice";

import { BASE_URL } from "../../../CONSTANTS";
import { useUserState } from "../../Slices/userSlice";
import { useRoute } from "@react-navigation/core";

const HowLongData = [
  {
    id: 1,
    title: "1",
  },
  {
    id: 2,
    title: "2",
  },

  {
    id: 3,
    title: "3",
  },
  {
    id: 6,
    title: "6",
  },

  {
    id: 9,
    title: "9",
  },
];

const EditGoal = () => {
  const currentdate = new Date();
  const userState = useUserState();
  const route = useRoute();
  const data = route?.params?.data;

  const toast = useToast();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [centerSelected, setCenterSelected] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstInput, setfirstInput] = useState();
  const [Goalamount, setGoalamount] = useState(data?.Goalamount);
  const [Savedamount, setSavedamount] = useState(data?.Savedamount);
  const [isSaved, setisSaved] = useState("");
  const [purpose, setpurpose] = useState(data?.purpose);
  const [PickedDate, setPickedDate] = useState("");
  const [endDate, setendDate] = useState(null);

  const [selectedItem, setSelectedItem] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
    if (date === "") {
      setPickedDate("");
    } else {
      let Date = formatCustomDate(date);
      setPickedDate(Date);
    }
  };
  const handleEditGoal = async () => {
    const savedAmount = Number(isSaved) + Number(Savedamount);
    console.log(savedAmount);
    try {
      const res = await axios.patch(
        `${BASE_URL}/finance/update-finance/${data?._id}`,
        {
          Goalamount,
          Savedamount: savedAmount,
          endDate: data?.endDate,
          purpose,
          user: userState.id,
        }
      );
      if (res.data) {
        toast.show("Goal edit successfully!", {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      }
      console.log("New goal added successfully");
      console.log(res, "updated res");
    } catch (error) {
      console.error("Error creating new goal:", error);
      toast.show("Failed to edit goal. Please try again.", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
      console.log(error, "Error creating new goal");
    }
  };

  console.log(isSaved, "is saved");

  const handleAddGoal = (text) => {
    setGoalamount(text);
  };
  const handleSavedAmount = (text) => {
    setisSaved(text);
  };
  const handlePurpose = (text) => {
    setpurpose(text);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : null}
    >
      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <HeaderTitle title='Edit goals' />
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.inputCard}>
              <AddGoalInput
                title='Add Saving goals'
                placeholder='Enter amount'
                handleChange={handleAddGoal}
                value={Goalamount}
              />
            </View>

            <View style={styles.inputCard}>
              <AddGoalInput
                title='How much to save monthly?'
                placeholder='Enter amount'
                handleChange={handleSavedAmount}
                value={Savedamount}
              />
            </View>

            <View style={styles.inputCard}>
              <AddGoalInput
                title='For how long?'
                placeholder='Enter period duration'
                handleDatePicker={showDatePicker}
                value={PickedDate}
              />
            </View>

            <View>
              <Text style={styles.title}>For how long?</Text>
              <HorizantalList
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setfirstInput={setfirstInput}
                selectedIndex={selectedIndex}
                items={HowLongData}
                centerSelected={centerSelected}
                setCenterSelected={setCenterSelected}
                setSelectedIndex={setSelectedIndex}
                PickedDate={setPickedDate}
                setendDate={setendDate}
              />
            </View>

            <View style={styles.inputCard}>
              <AddGoalInput
                title='Amount Saved'
                placeholder='Enter how much amount saved until now?'
                handleChange={handleSavedAmount}
                value={isSaved}
              />
            </View>

            <View style={styles.inputCard}>
              <AddGoalInput
                title='Purpose of saving?'
                placeholder='Enter reason of saving'
                handleChange={handlePurpose}
                value={purpose}
              />
            </View>
            <View
              style={{
                width: "70%",
                alignSelf: "center",
                paddingVertical: scale(12),
              }}
            >
              <GradientButton
                title='Save Goal'
                onPress={handleEditGoal}
                containerStyle={styles.gradientButton}
              />
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='datetime'
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditGoal;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Color.White,
    flex: 1,
    position: "relative",
    bottom: scale(10),
    borderTopRightRadius: scale(14),
    borderTopLeftRadius: scale(14),
    paddingVertical: scale(23),
  },
  inputCard: {
    paddingVertical: scale(9),
  },
  title: {
    fontFamily: "Medium",
    paddingHorizontal: scale(22),
    paddingVertical: scale(4),
    fontSize: scale(15),
  },
});
