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
      <Modal visible={modalVisible} onDismiss={handleHideModal}>
        <View style={styles.container}>
          <View
            style={{
              height: scale(300),
              paddingHorizontal: scale(25),
              paddingVertical: scale(20),
              backgroundColor: Color.White,
              bottom: scale(-150),
            }}
          >
            <Text style={styles.title}>Select your language</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  borderWidth: 1,
                  borderColor: Color.Blue,
                  borderRadius: 8,
                }}
              >
                <Text style={styles.buttonTitle}>English</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>Arabic</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  container: {
    // position: "relative",
    // bottom: scale(-300),
    backgroundColor: "white",
    flex: 1,
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
    elevation: 2,
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  buttonTitle: {
    fontFamily: "Medium",
    color: Color.SubHeading,
    fontSize: scale(15),
  },
});
