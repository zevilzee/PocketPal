import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Color from "../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { FontAwesome } from "react-native-vector-icons";

const AddGoalInput = ({
  title,
  value,
  handleChange,
  placeholder,
  handleDatePicker,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={(e) => handleChange(e)}
        />

        {title === "For how long?" && (
          <TouchableOpacity onPress={handleDatePicker}>
            <FontAwesome name='calendar' style={styles.calendericon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddGoalInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    width: "90%",
    alignSelf: "center",
    borderRadius: scale(12),
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 4,
    // paddingHorizontal: scale(14),
  },
  title: {
    fontFamily: "Medium",
    fontSize: scale(13),
  },
  topContainer: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(11),
    borderBottomWidth: 1,
    borderBlockColor: Color.Border,
  },
  bottomContainer: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(9),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendericon: {
    color: Color.Blue,
    fontSize: scale(18),
  },
});
