import { View, StyleSheet, ScrollView } from "react-native";
import { Table, Row } from "react-native-table-component";
import { scale } from "react-native-size-matters";
import Color from "../../../../assets/colors/Color";
import { formatCustomDate } from "../../../Utiles/GetData";
import { useUserState } from "../../../Slices/userSlice";
import { CustomDateYear } from "../../../Utiles/GetDateYear";

const TableDesign = ({ data }) => {
  const userState = useUserState();
  const totalBalce = userState?.totalIncome - userState?.totalExpence;

  const tableHead = ["Date", "Daily income", "Cash In Hand"];
  const tableData = data?.map((item) => {
    const date = CustomDateYear(item?.date);
    return [date, item?.amount, totalBalce];
  });

  return (
    <ScrollView style={styles.container}>
      <ScrollView>
        <View>
          <Table borderStyle={{ borderWidth: 0 }}>
            <Row
              data={[...tableHead]}
              style={styles.head}
              textStyle={styles.headText}
              widthArr={[110, 125, 125]}
            />

            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={[...rowData]}
                style={
                  index % 2 === 1
                    ? { ...styles.row, backgroundColor: Color.Bg }
                    : styles.row
                }
                textStyle={styles.text}
                widthArr={[110, 150, 100]}
              />
            ))}
          </Table>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  head: {
    height: scale(45),
    backgroundColor: Color.Bg,
    width: "100%",
    borderBottomColor: Color.Border,
    borderBottomWidth: 1,
  },
  headText: {
    textAlign: "center",
    fontFamily: "Medium",
    fontSize: scale(13),
    paddingHorizontal: scale(12),
  },
  text: {
    textAlign: "center",
    fontFamily: "Medium",
    fontSize: scale(13),
  },
  row: {
    backgroundColor: Color.Bg,
    paddingVertical: scale(20),
    borderBottomColor: Color.Border,
    borderBottomWidth: 1,
    width: "100%",
  },
});

export default TableDesign;
