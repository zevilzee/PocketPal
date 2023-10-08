import { View, StyleSheet, ScrollView } from "react-native";
import { Table, Row } from "react-native-table-component";
import { scale } from "react-native-size-matters";
import Color from "../../../../assets/colors/Color";

const TableDesign = ({ data }) => {
  const tableHead = ["Date", "Daily income", "Cash In Hand"];

  const tableData = data?.map((item) => {
    return [item?.date, item?.cash, item?.cashInHand];
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
              widthArr={[100, 125, 125]}
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
                widthArr={[100, 150, 100]}
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
