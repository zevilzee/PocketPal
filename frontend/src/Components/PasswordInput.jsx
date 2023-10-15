import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

const PasswordInput = ({
  placeholder,
  value,
  onChangeText,
  icon,
  onIconPress,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {icon && (
        <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: Color.Input,
    width: scale(300),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 16,
    color: Color.Input,
    fontFamily: "Medium",
  },
});

export default PasswordInput;
