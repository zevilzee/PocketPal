import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";

const screenWidth = Dimensions.get("screen").width;
const screenHeigh = Dimensions.get("screen").height;

const Faq = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <HeaderTitle title='FAQs' />
      <View style={styles.contentContainer}>
        <Text style={styles.qu}>Frequently Asked Questions</Text>

        <View style={{ width: "90%", alignSelf: "center" }}>
          <View>
            <Text style={styles.app}>Financial App Essentials</Text>
            <View style={styles.userCard}>
              <TouchableOpacity
                // onPress={() => navigation.navigate("UserProfile")}
                style={styles.topContainer}
              >
                <Text style={styles.pocketPall}>What is Pocket Pall?</Text>
              </TouchableOpacity>
              <View style={styles.bottomContainer}>
                <Text style={styles.desc}>
                  Pocket Pall is a home budget management app designed to help
                  users track their income, expenses, and overall financial
                  health, providing insights to manage money better.
                </Text>
              </View>
            </View>

            <View style={styles.itemCard}>
              <Text style={styles.title}>
                How does Pocket Pall ensure my financial data is secure?
              </Text>
            </View>

            <View style={styles.itemCard}>
              <Text style={styles.title}>
                Can I link my bank accounts with Pocket Pall?
              </Text>
            </View>

            <View style={styles.itemCard}>
              <Text style={styles.title}>
                Is there a fee to use Pocket Pall?
              </Text>
            </View>

            <View style={styles.itemCard}>
              <Text style={styles.title}>
                Does Pocket Pall offer expense categorization and budget
                recommendations?
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Faq;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Color.White,
    bottom: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  qu: {
    fontFamily: "Bold",
    alignSelf: "center",
    paddingVertical: screenHeigh * 0.03,
    fontSize: scale(20),
  },
  app: {
    fontFamily: "Medium",
    fontSize: scale(18),
  },
  userCard: {
    backgroundColor: Color.White,
    width: "100%",
    alignSelf: "center",
    height: scale(115),
    marginVertical: scale(10),
    borderRadius: scale(10),
    elevation: 4,
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },

  topContainer: {
    borderBottomWidth: 1,
    width: "100%",
    alignSelf: "center",
    borderBottomColor: Color.Border,
    paddingHorizontal: 12,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    // paddingVertical: scale(4),
  },
  desc: {
    fontFamily: "Regular",
    color: Color.Input,
    paddingVertical: scale(5),
    fontSize: scale(12),
  },
  pocketPall: {
    paddingVertical: scale(10),
    fontFamily: "Medium",
    fontSize: scale(13),
  },
  title: {
    paddingHorizontal: scale(14),
    fontFamily: "Bold",
    fontSize: 13,
  },
  itemCard: {
    backgroundColor: Color.White,
    width: "100%",
    alignSelf: "center",
    marginVertical: scale(10),
    borderRadius: scale(10),
    elevation: 4,
    shadowColor: Color.Bg,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    height: scale(50),
    justifyContent: "center",
  },
});
