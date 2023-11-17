import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import { formatCustomDate } from "../../Utiles/GetData";
import { BASE_URL } from "../../../CONSTANTS";
import { useUserState } from "../../Slices/userSlice";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../../context/ContextProvider";

const ExpenseDetails = ({ data, handleDelete }) => {
  const navigation = useNavigation();
  const userState = useUserState();
  const { expenceCategory, setexpenceCategory } = useStateContext();

  if (!data) {
    // Handle the case where data is not available
    return <Text>Data not available</Text>;
  }

  const formatedDate = formatCustomDate(data?.date);

  const handleEdit = (data) => {
    navigation.navigate("EditExpence", data);
    setexpenceCategory(data?.category);
  };
  return (
    <View style={styles.container}>
      <View style={styles.entries}>
        <View
          style={{ borderBottomWidth: 0.5, borderBottomColor: Color.Border }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.leftSdie}>
              <Image
                source={require("../../../assets/bill.png")}
                style={styles.image}
              />
              <View style={styles.description}>
                <Text style={styles.title}>{data?.name}</Text>
                <Text style={styles.date}>{formatedDate}</Text>
              </View>
            </View>
            <View style={styles.rightIcons}>
              <TouchableOpacity onPress={() => handleDelete(data?._id)}>
                <AntDesign name='delete' style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(data)}>
                <Ionicons name='create-outline' style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountTitle}>Amount:</Text>
            <Text style={styles.amount}>${`${data?.amount}`}</Text>
          </View>
          <View
            style={
              data?.status === "paid"
                ? styles.paidContainer
                : styles.unpaidContainer
            }
          >
            <Text style={styles.statusTitle}>{data.status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
    flex: 1,
  },
  entries: {
    backgroundColor: Color.Bg,

    gap: scale(10),
    paddingVertical: scale(10),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
  leftSdie: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  image: {
    width: scale(24),
    height: scale(24),
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Bold",
    fontSize: scale(14),
  },
  date: {
    fontFamily: "Medium",
    fontSize: scale(10),
    color: Color.SubHeading,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(14),
  },
  icon: {
    fontSize: scale(15),
    color: Color.Black,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  amountTitle: {
    fontFamily: "Medium",
    fontSize: scale(12),
  },
  amount: {
    fontFamily: "Bold",
    fontSize: scale(12),
    color: Color.Red,
  },
  paidContainer: {
    backgroundColor: Color.Green,
    width: scale(50),
    textAlign: "center",
    borderRadius: scale(10),
  },
  statusTitle: {
    fontFamily: "Regular",
    fontSize: scale(11),
    alignSelf: "center",
    paddingVertical: scale(4),
    color: Color.White,
  },
  unpaidContainer: {
    backgroundColor: "#F10A0A",
    width: scale(50),
    textAlign: "center",
    borderRadius: scale(10),
  },
});

export default ExpenseDetails;
