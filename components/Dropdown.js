import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Input from "./Input";

export default function Dropdown({
  label,
  labelStyle,
  data = [],
  value,
  onSelect,
  searchable = true,
}) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSelect = (item) => {
    onSelect(item);
    setOpen(false);
    setSearchText(""); // ล้างการค้นหาเมื่อเลือกแล้ว
  };

  // กรองข้อมูลตามคำค้นหา
  const filteredData = searchText
    ? data.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      {/* Selected box */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value ? value.label : "ເລືອກລູກຄ້າ..."}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color="#555"
        />
      </TouchableOpacity>

      {/* Options List */}
      {open && (
        <View style={styles.list}>
          {/* Search Input */}
          {searchable && (
            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#999"
                style={styles.searchIcon}
              />
              <Input
                placeholder="ຄົ້ນຫາ..."
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchInput}
                colorScheme="dark"
              />
            </View>
          )}

          {/* Scrollable List */}
          <ScrollView
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled" // ให้สามารถกดเลือกได้ตอนเปิดคีย์บอร์ด
          >
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TouchableOpacity
                  key={item.value.toString()}
                  style={[
                    styles.item,
                    value?.value === item.value && styles.selectedItem,
                  ]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.itemText,
                      value?.value === item.value && styles.selectedItemText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {value?.value === item.value && (
                    <Ionicons name="checkmark" size={20} color="#2C6BED" />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>ບໍ່ພົບຂໍ້ມູນ</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "500",
    fontFamily: "NotoSansLao-Regular",
    color: "#000",
  },
  dropdown: {
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2C6BED",
  },
  text: {
    fontSize: 18,
    color: "#000",
    fontFamily: "NotoSansLao-Regular",
    flex: 1,
  },
  placeholder: {
    color: "#999",
  },
  list: {
    position: "absolute",
    top: 95,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    maxHeight: 250, // เพิ่มความสูงเพื่อรองรับช่องค้นหา
    zIndex: 1001,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  searchIcon: {
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    borderColor: "#2C6BED",
    height: 60,
    borderRadius: 6,
    paddingLeft: 35,
    fontSize: 16,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedItem: {
    backgroundColor: "#f0f7ff",
  },
  itemText: {
    fontSize: 18,
    fontFamily: "NotoSansLao-Regular",
    color: "#000",
    flex: 1,
  },
  selectedItemText: {
    color: "#2C6BED",
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    fontFamily: "NotoSansLao-Regular",
  },
});
