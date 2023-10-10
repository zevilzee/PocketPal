import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import HeaderTitle from "../../../Components/HeaderTitle";
import Color from "../../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import { textInputContainer } from "../../../Components/CustomStyle";
import { AntDesign, MaterialIcons } from "react-native-vector-icons";

const CashIn = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle title="Income" />
      <View style={styles.formContainer}>
        <View style={{ marginTop: scale(20) }}>
          <View style={textInputContainer}>
            <Text>$</Text>
            <TextInput
              placeholder="Enter amount"
              style={styles.textInput}
              keyboardType="number-pad"
            />
          </View>

          <View style={textInputContainer}>
            <View style={styles.method}>
              <View style={styles.addContainer}>
                <AntDesign
                  name="plus"
                  style={{
                    ...styles.icon,
                    fontSize: scale(13),
                    color: Color.Blue,
                  }}
                />
                <Text style={styles.title}>Select Income Methods</Text>
              </View>
              <View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  style={styles.icon}
                />
              </View>
            </View>
          </View>

          <View style={textInputContainer}>
            <View style={styles.method}>
              <Text>Enter Details</Text>
              <MaterialIcons name="keyboard-voice" style={{ ...styles.icon }} />
            </View>
          </View>
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
});
