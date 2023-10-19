import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import BottomTab from "../../Components/BottomTab";
import Color from "../../../assets/colors/Color";
import { scale } from "react-native-size-matters";
import DurationCard from "./DurationCard";
import StartEndTime from "./StartEndTime";
import ItemsTable from "./HistoryTable/ItemsTable";
import Icon from "../../../assets/pdfW.png";
import ModalDuration from "./ModalDuration";
import { BASE_URL } from "../../../CONSTANTS";
import axios from "axios";
import { useUserState } from "../../Slices/userSlice";
const HistoryScreen = () => {
  const userState = useUserState();
  const [modalVisibal, setmodalVisibal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");
  const [date, setDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/income/getIncome/${userState.id}`,
          {
            headers: {
              "auth-token": userState.token,
            },
          }
        );
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <HeaderTitle title="Income history" />
      <View style={styles.historyCard}>
        <DurationCard modal={setmodalVisibal} selectedItem={selectedItem} />
        <StartEndTime
          date={date}
          setDate={setDate}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemsTable data={data} />
      </ScrollView>

      <ModalDuration
        visibal={modalVisibal}
        setmodalVisibal={setmodalVisibal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <BottomTab title="PDF" image={Icon} />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  historyCard: {
    alignSelf: "center",
    position: "relative",
    top: scale(-18),
  },
});
