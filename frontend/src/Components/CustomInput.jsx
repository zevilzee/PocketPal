import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

const CustomInput = ({ placeholder, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: Color.Input,
    width: scale(300),
  },
  input: {
    fontSize: 16,
    color: Color.Input,
    fontFamily: "Medium",
  },
});

export default CustomInput;
