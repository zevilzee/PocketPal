import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../Components/HeaderTitle";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";
import { Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { BASE_URL } from "../../../CONSTANTS";
import { useUserState } from "../../Slices/userSlice";
import axios from "axios";
import { AntDesign } from "react-native-vector-icons";
import { formatCustomDate } from "../../Utiles/GetData";
import { CustomDateYear } from "../../Utiles/GetDateYear";
import { CustomDateWithoutYear } from "../../Utiles/GetDateName";
import IncomeDetailsGraph from "../../Components/IncomeDetailsGraph";
import SaveingReportDetails from "../../Components/SaveingReportDetails";
import AppBottomTab from "../../Components/AppBottomTab";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 0.3) => `rgba(22, 61, 167, ${opacity})`,
  verticalLabelRotation: 30, // Add vertical labels on Y-axis
};

const SavingReport = () => {
  const currentDate = new Date();
  const dateNow = CustomDateWithoutYear(currentDate);
  const userState = useUserState();
  const [amount, setAmount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedDuration, setselectedDuration] = useState("Day");
  const [incomeDetails, setincomeDetails] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/finance/getFinance/${userState.id}`,

        {
          headers: {
            "auth-token": userState.token,
          },
        }
      );
      const data = res?.data?.data;
      const amounts = data.map((item) => Number(item?.Goalamount));
      if (amounts?.length === 0) {
        setAmount([0]);
      } else {
        setAmount(amounts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDataPointClick = (value, dataset) => {
    setSelectedPoint({
      x: value.x,
      y: value.y,
      value: value.value,
    });

    setTimeout(() => {
      setSelectedPoint(null);
    }, 3000);
  };

  let data = {
    datasets: [
      {
        data: amount || [0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  console.log(incomeDetails);
  return (
    <View style={styles.container}>
      <HeaderTitle title='Saving Report' />
      <ScrollView style={styles.contentContainer}>
        {!loading && (
          <>
            <View style={styles.topContainer}>
              <TouchableOpacity
                style={
                  selectedDuration === "Day"
                    ? styles.selectedDuration
                    : styles.monthsCard
                }
                onPress={() => setselectedDuration("Day")}
              >
                <Text
                  style={
                    selectedDuration === "Day"
                      ? styles.selectedTitle
                      : styles.titleMonth
                  }
                >
                  Day
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  selectedDuration === "Month"
                    ? styles.selectedDuration
                    : styles.monthsCard
                }
                onPress={() => setselectedDuration("Month")}
              >
                <Text
                  style={
                    selectedDuration === "Month"
                      ? styles.selectedTitle
                      : styles.titleMonth
                  }
                >
                  Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  selectedDuration === "Year"
                    ? styles.selectedDuration
                    : styles.monthsCard
                }
                onPress={() => setselectedDuration("Year")}
              >
                <Text
                  style={
                    selectedDuration === "Year"
                      ? styles.selectedTitle
                      : styles.titleMonth
                  }
                >
                  Year
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.todayIncom}>
              <View style={styles.currentIncome}>
                <Text style={styles.incomTitle}>Today Saving</Text>
                <Text style={styles.incomAmount}>${incomeDetails}</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.currentDate}>
                  <AntDesign name='calendar' style={styles.calendarIcon} />
                  <Text style={styles.selectedTitle}>{dateNow}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <LineChart
              data={data}
              width={screenWidth}
              height={256}
              chartConfig={chartConfig}
              onDataPointClick={handleDataPointClick}
              bezier
            />
            {selectedPoint !== null && (
              <View
                style={{
                  backgroundColor: Color.Blue,
                  position: "absolute",
                  top: screenHeight * 0.46,
                  left: screenWidth * 0.08,
                  paddingHorizontal: screenWidth * 0.04,
                  paddingVertical: screenHeight * 0.006,
                  borderRadius: 6,
                }}
              >
                <Text style={styles.selectedValue}>{selectedPoint.value}</Text>
              </View>
            )}
            <View>
              <SaveingReportDetails incomeDetails={setincomeDetails} />
            </View>
          </>
        )}
      </ScrollView>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          zIndex: 100,
        }}
      >
        <AppBottomTab active='usere' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Color.White,
    bottom: scale(10),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  label: {
    alignSelf: "center",
    marginVertical: scale(10),
    fontSize: scale(16),
    color: Color.DarkGrey,
  },
  topContainer: {
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    gap: 1,
    marginVertical: screenHeight * 0.01,
    backgroundColor: Color.White,
    borderRadius: 6,
    shadowOffset: {
      width: 9,
      height: 8,
    },
    shadowOpacity: 0.27,
    shadowRadius: 6.65,
    elevation: 8,
  },
  monthsCard: {
    width: "33%",
    borderRadius: 4,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    alignItems: "center",
  },
  selectedDuration: {
    width: "33%",
    borderRadius: 4,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    alignItems: "center",
    backgroundColor: Color.Blue,
  },
  titleMonth: {
    fontFamily: "Medium",
    fontSize: scale(13),
  },
  selectedTitle: {
    fontFamily: "Medium",
    fontSize: scale(13),
    color: Color.White,
  },
  todayIncom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: scale(6),
  },
  currentIncome: {
    gap: 4,
  },
  incomTitle: {
    fontFamily: "Medium",
    fontSize: scale(12),
  },
  incomAmount: {
    fontFamily: "Bold",
    fontSize: scale(24),
  },
  currentDate: {
    borderRadius: 4,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    alignItems: "center",
    backgroundColor: Color.Blue,
    flexDirection: "row",
    gap: 10,
  },
  calendarIcon: {
    fontSize: 20,
    color: "white",
  },
  selectedValue: {
    color: Color.White,
    fontFamily: "Bold",
    fontSize: scale(13),
  },
});

export default SavingReport;
