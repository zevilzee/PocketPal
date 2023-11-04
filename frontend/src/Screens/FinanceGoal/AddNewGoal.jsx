import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import AddGoalInput from "../../Components/AddGoalInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatCustomDate } from "../../Utiles/GetData";
import HorizantalList from "../../Components/HorizantalList";
import GradientButton from "../../Components/GradientButton";

const HowLongData = [
  {
    id: 1,
    title: "1 Month",
  },
  {
    id: 2,
    title: "2 Month",
  },

  {
    id: 4,
    title: "3 Month",
  },
  {
    id: 5,
    title: "4 Month",
  },
  {
    id: 6,
    title: "5 Month",
  },
  {
    id: 7,
    title: "6 Month",
  },
  {
    id: 8,
    title: "7 Month",
  },
  {
    id: 9,
    title: "8 Month",
  },
  {
    id: 10,
    title: "9 Month",
  },
  {
    id: 11,
    title: "1 Year",
  },
];

const AddNewGoal = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [centerSelected, setCenterSelected] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setmodalVisible] = useState(false);
  const [firstInput, setfirstInput] = useState();

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
  };

  let PickedDate;
  if (date === "") {
    PickedDate = "";
  } else {
    PickedDate = formatCustomDate(date);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <HeaderTitle title="Add new goals" />
      <View style={styles.contentContainer}>
        <View style={styles.inputCard}>
          <AddGoalInput title="Add Saving goals" placeholder="Enter amount" />
        </View>

        <View style={styles.inputCard}>
          <AddGoalInput
            title="How much to save monthly?"
            placeholder="Enter amount"
          />
        </View>

        <View style={styles.inputCard}>
          <AddGoalInput
            title="For how long?"
            placeholder="Enter period duration"
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
          />
        </View>

        <View style={styles.inputCard}>
          <AddGoalInput
            title="Purpose of saving?"
            placeholder="Enter reason of saving"
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
            title="Save Goal"
            // onPress={() => handleVerificationCode(recaptchaVerifier)}
            containerStyle={styles.gradientButton}
          />
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

export default AddNewGoal;

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
