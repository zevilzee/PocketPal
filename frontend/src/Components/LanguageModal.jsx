import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Modal, Portal } from "react-native-paper";
import Color from "../../assets/colors/Color";
import { scale } from "react-native-size-matters";

const LanguageModal = ({ modalVisible, setModalVisible }) => {
  const handleHideModal = () => {
    setModalVisible(false);
  };

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={handleHideModal}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Select your language</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTitle}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTitle}>Arabic</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    position: "relative",
    bottom: scale(-300),
    height: scale(300),
    borderTopRightRadius: scale(15),
    borderTopLeftRadius: scale(15),
    paddingHorizontal: scale(25),
    paddingVertical: scale(20),
  },
  title: {
    fontFamily: "Medium",
    fontSize: scale(16),
  },
  buttonContainer: {
    height: "100%",
    paddingVertical: scale(16),
    gap: scale(10),
  },
  button: {
    alignItems: "center",
    paddingVertical: scale(12),
    borderRadius: scale(10),
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    elevation: 3,
  },
  buttonTitle: {
    fontFamily: "Medium",
    color: Color.SubHeading,
    fontSize: scale(15),
  },
});
