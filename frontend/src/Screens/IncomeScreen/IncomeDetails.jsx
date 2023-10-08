import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import Color from "../../../assets/colors/Color";

const EntryItem = ({ item }) => {
  console.log(item);
  return (
    <View
      style={{
        borderBottomColor: Color.Border,
        borderBottomWidth: 0.5,
      }}
    >
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.title}>01:27 PM</Text>

          <Text style={{ ...styles.title, paddingVertical: scale(4) }}>
            1 item
          </Text>
          <Text style={styles.billName}>Bill no.1</Text>
        </View>
        <View>
          <Text style={styles.billamount}>$660</Text>
        </View>
      </View>
    </View>
  );
};

const IncomeDetails = ({ data }) => {
  if (!data) {
    // Handle the case where data is not available
    return <Text>Data not available</Text>;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: Color.Border,
          borderBottomWidth: 0.5,
        }}
      >
        <View style={styles.topContainer}>
          <View>
            <Text>{data?.timestamp}</Text>

            <Text>{data?.entries?.length} entries</Text>
          </View>
          <View>
            <Text style={{ ...styles.billamount, alignSelf: "center" }}>
              ${data?.totalAmount}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.entries}>
        <FlatList
          data={data.entries}
          renderItem={({ item }) => <EntryItem item={item} />}
          keyExtractor={(item) => item.id} // Replace 'id' with your unique identifier
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Bg,
    padding: scale(10),
    marginVertical: scale(5),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  entries: {
    // marginTop: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  title: {
    fontFamily: "Regular",
    fontSize: scale(12),
  },
  billName: {
    fontFamily: "Bold",
    fontSize: scale(13),
  },
  billamount: {
    alignSelf: "baseline",
    fontFamily: "Medium",
    position: "relative",
    bottom: scale(-15),
    fontSize: scale(13),
    color: Color.Green,
  },
});

export default IncomeDetails;
