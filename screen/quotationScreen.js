import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";
import QuotationList from "../components/quotationList";



export default function QuotationScreen() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ລາຍການໃບສະເໜີລາຄາ</Text>
      </View>

      {/* Search Container */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Input
            placeholder="ຄົ້ນຫາໃບສະເໜີລາຄາ..."
            value={searchText}
            onChangeText={setSearchText}
            colorScheme="dark"
            style={{ height: 60 }}
            iconName="search"
            iconSize={30}
            iconPosition="right"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="ສ້າງໃບສະເໜີ"
            onPress={handleSearch}
            iconName="description"
            style={{
              backgroundColor: "#294aa5",
              height: 60, 
              borderRadius: 10,
            }}
          />
        </View>
      </View>

      {/* ✅ Quotation List */}
      <View style={styles.listContainer}>
        <QuotationList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {

    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerText: {
    color: "#000",
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "NotoSansLao-Bold",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 2,
    flexDirection: "row",
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  buttonWrapper: {
    minWidth: 100,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
