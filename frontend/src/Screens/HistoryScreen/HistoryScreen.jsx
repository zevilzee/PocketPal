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
        // console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  function getFormattedDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

  const customeDateHistory = async (selectedOption) => {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);

    if (selectedOption === "This Month") {
      start.setDate(1);
    } else if (selectedOption === "Single Day") {
      start.setDate(today.getDate());
    } else if (selectedOption === "Last Week") {
      start.setDate(today.getDate() - 6);
    } else if (selectedOption === "Last Month") {
      start.setMonth(today.getMonth() - 1);
      start.setDate(1);
      end.setDate(0);
    } else if (selectedOption === "All") {
      start.setFullYear(today.getFullYear() - 6);
    }

    const startDate = getFormattedDate(start);
    const endDate = getFormattedDate(end);

    try {
      const res = await axios.get(`${BASE_URL}/income/get-income-history`, {
        headers: {
          "auth-token": userState.token,
        },
        params: {
          startDate,
          endDate,
          user: userState.id,
        },
      });
      console.log(res?.data);
      setData(res.data);
    } catch (error) {
      console.log("error while fetching custom date history", error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTitle title="Income history" />
      <View style={styles.historyCard}>
        <DurationCard modal={setmodalVisibal} selectedItem={selectedItem} />
        {/* <StartEndTime
          date={date}
          setDate={setDate}
          endTime={endTime}
          setEndTime={setEndTime}
        /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemsTable data={data} />
      </ScrollView>

      <ModalDuration
        visibal={modalVisibal}
        setmodalVisibal={setmodalVisibal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        getHistory={customeDateHistory}
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
