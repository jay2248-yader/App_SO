import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

export default function QuotationList({ data = [] }) {
  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.center]}>{index + 1}</Text>
      <Text style={[styles.cell]}>{item.DOCNO}</Text>
      <Text style={[styles.cell]}>{item.DOCDATE?.split("T")[0]}</Text>
      <Text style={[styles.cell]}>{item.ARCODE}</Text>
      <Text style={[styles.cell]}>{item.ARNAME}</Text>
      <Text style={[styles.cell]}>{item.REMARK || "-"}</Text>
      <Text style={[styles.cell]}>{item.CREDITCODE}</Text>
      <Text style={[styles.cell]}>{item.SALECODE}</Text>
      <Text style={[styles.cell]}>{item.DOCGROUP}</Text>
      <Text style={[styles.cell]}>{item.VALIDDAY}</Text>
      <Text style={[styles.cell]}>{item.EXPIREDATE?.split("T")[0]}</Text>
      <Text style={[styles.cell]}>{item.FINISHCREATE?.split("T")[0]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/*  ScrollView  */}
      <ScrollView showsVerticalScrollIndicator={true}>
        {/*   ScrollView */}
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View>
            {/* Header */}
            <View style={[styles.row, styles.header]}>
              <Text style={[styles.cell, styles.center, styles.headerText]}>ລຳດັບ</Text>
              <Text style={[styles.cell, styles.headerText]}>ເລກໃບສະເໜີ</Text>
              <Text style={[styles.cell, styles.headerText]}>ວັນທີ</Text>
              <Text style={[styles.cell, styles.headerText]}>ລະຫັດລູກຄ້າ</Text>
              <Text style={[styles.cell, styles.headerText]}>ຊື່ລູກຄ້າ</Text>
              <Text style={[styles.cell, styles.headerText]}>ໝາຍເຫດ</Text>
              <Text style={[styles.cell, styles.headerText]}>ເຄຣດິດ</Text>
              <Text style={[styles.cell, styles.headerText]}>ລະຫັດຂາຍ</Text>
              <Text style={[styles.cell, styles.headerText]}>ກຸ່ມເອກະສານ</Text>
              <Text style={[styles.cell, styles.headerText]}>ວັນທີ່ຖືກຕ້ອງ</Text>
              <Text style={[styles.cell, styles.headerText]}>ວັນໝົດອາຍຸ</Text>
              <Text style={[styles.cell, styles.headerText]}>ສຳເລັດການສ້າງ</Text>
            </View>

            {/*  FlatList ข้อมูล */}
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false} // 
            />
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderWidth: 1,
    borderColor: "#294aa5",
    borderRadius: 8,
    backgroundColor: "#fff",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#294aa5",
  },
  header: {
    backgroundColor: "#294aa5",
  },
  headerText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "NotoSansLao-Bold",
  },
  cell: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: "NotoSansLao-Regular",
  },
  center: {
    textAlign: "center",
  },
});
