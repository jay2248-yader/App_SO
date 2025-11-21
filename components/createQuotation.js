import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Input from "./Input";
import Button from "./Button";

// หาความสูงของ Status Bar สำหรับ Android
const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 24 : 0;

export default function CreateQuotation({ onClose, getAllCustomers, navigation }) {
  const [customerCode, setCustomerCode] = useState("");
  const [customerName, setCustomerName] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");

  // ✅ State สำหรับการค้นหา
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // ✅ ฟังก์ชันค้นหาลูกค้า
  const searchCustomers = async (searchText) => {
    if (!searchText || searchText.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      setIsSearching(true);
      setShowResults(true);

      const response = await getAllCustomers({
        page: 1,
        limit: 10,
        search: searchText.trim(),
      });

      if (response?.data_id?.rows) {
        console.log("🔍 Search Results:", response.data_id.rows);
        setSearchResults(response.data_id.rows);
      } else {
        console.log("⚠️ No results found");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("❌ Error searching customers:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // ✅ เมื่อพิมพ์รหัสลูกค้า ให้ค้นหาอัตโนมัติ
  useEffect(() => {
    const timer = setTimeout(() => {
      searchCustomers(customerCode);
    }, 500); // debounce 500ms

    return () => clearTimeout(timer);
  }, [customerCode]);

  // ✅ เมื่อเลือกลูกค้า
  const handleSelectCustomer = (customer) => {
    console.log("🎯 Selected Customer:", customer);
    setSelectedCustomer(customer);
    setCustomerCode(customer.CODE || "");
    setCustomerName(customer.NAMETH || "");
    setAddress(customer.ADDRESSTH || "");
    setPhone(customer.TELEPHONE || "");
    setType(customer.MAINGROUP || "");
    setShowResults(false);
    setSearchResults([]);
  };

  const handleSubmit = () => {
    console.log("Submit Quotation", {
      customerCode,
      customerName,
      address,
      phone,
      type,
      selectedCustomer,
    });
    
    // ✅ ไปหน้า ProductScreen พร้อมส่งข้อมูลลูกค้า
    if (navigation) {
      navigation.navigate('ProductScreen', {
        customer: {
          code: customerCode,
          name: customerName,
          address: address,
          phone: phone,
          type: type,
          selectedCustomer: selectedCustomer,
        }
      });
      
      // ปิด Modal
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
<View style={styles.headerRow}>
  <View style={styles.headerLeft}>
    <Text style={styles.headerText}>ສ້າງໃບສະເໜີ</Text>
    <View style={styles.headerUnderline} />
  </View>

{/*
<TouchableOpacity onPress={onClose} style={styles.closeButton}>
  <Ionicons name="close" size={28} color="#fff" />
</TouchableOpacity>
*/}

</View>

      {/* ✅ ScrollView */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Customer Code with Search */}
          <View style={styles.inputGroup}>
            <Input
              label="ລະຫັດລູກຄ້າ"
              labelStyle={styles.label}
              placeholder="ພິມລະຫັດເພື່ອຄົ້ນຫາ..."
              value={customerCode}
              onChangeText={(text) => {
                setCustomerCode(text);
                if (!text) {
                  setSelectedCustomer(null);
                  setCustomerName("");
                  setAddress("");
                  setPhone("");
                  setType("");
                }
              }}
              colorScheme="dark"
              style={styles.inputField}
              placeholderTextColor="#999"
              iconName={isSearching ? undefined : "search"}
              iconSize={20}
              iconPosition="right"
            />

            {/* ✅ แสดงผลการค้นหา */}
            {showResults && (
              <View style={styles.searchResultsContainer}>
                {isSearching ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#2C6BED" />
                    <Text style={styles.loadingText}>ກຳລັງຄົ້ນຫາ...</Text>
                  </View>
                ) : searchResults.length > 0 ? (
                  <View style={styles.resultsList}>
                    {searchResults.map((item, index) => {
                      console.log(`📋 Rendering item ${index}:`, item);
                      return (
                        <TouchableOpacity
                          key={
                            item.customer_id?.toString() || `customer-${index}`
                          }
                          style={styles.resultItem}
                          onPress={() => handleSelectCustomer(item)}
                        >
                          <View style={styles.resultContent}>
                            <Text style={styles.resultCode}>{item.CODE}</Text>
                            <Text style={styles.resultName}>{item.NAMETH}</Text>
                          </View>
                          <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#999"
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>ບໍ່ພົບຂໍ້ມູນລູກຄ້າ</Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Customer Name (Read-only after selection) */}
          <View style={styles.inputGroup}>
            <Input
              label="ຊື່ລູກຄ້າ"
              labelStyle={styles.label}
              placeholder="ເລືອກຈາກການຄົ້ນຫາ"
              value={customerName}
              onChangeText={setCustomerName}
              colorScheme="dark"
              style={[
                styles.inputField,
                selectedCustomer && styles.inputFieldSelected,
              ]}
              placeholderTextColor="#999"
              editable={!selectedCustomer}
            />
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <Input
              label="ທີ່ຢູ່"
              labelStyle={styles.label}
              placeholder="ບ້ານ ເມືອງ ແຂວງ"
              value={address}
              onChangeText={setAddress}
              colorScheme="dark"
              style={[
                styles.inputField,
                selectedCustomer && styles.inputFieldSelected,
              ]}
              placeholderTextColor="#999"
              editable={!selectedCustomer}
            />
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Input
              label="ເບີໂທລະສັບ"
              labelStyle={styles.label}
              placeholder="020 456 999 90"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              colorScheme="dark"
              style={[
                styles.inputField,
                selectedCustomer && styles.inputFieldSelected,
              ]}
              placeholderTextColor="#999"
              editable={!selectedCustomer}
            />
          </View>

          {/* Type */}
          <View style={styles.inputGroup}>
            <Input
              label="ປະເພດລູກຄ້າ"
              labelStyle={styles.label}
              placeholder="VIP"
              value={type}
              onChangeText={setType}
              style={[
                styles.inputField,
                selectedCustomer && styles.inputFieldSelected,
              ]}
              colorScheme="dark"
              placeholderTextColor="#999"
              editable={!selectedCustomer}
            />
          </View>

          {/* Warning + Button Row */}
          <View style={styles.actionRow}>
            <Text style={styles.warningText}>
              ກະລຸນາກວດສອບຂໍ້ມູນກ່ອນດຳເນີນການຕໍ່
            </Text>

            <Button
              title="ດຳເນີນການ"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  headerLeft: {
  alignSelf: "flex-center",
},

headerUnderline: {
  marginTop: 10,
  height: 1,
  width: "425%",  
  backgroundColor: "#2C6BED", 
},


  headerText: {
    fontSize: 28,
    fontFamily: "NotoSansLao-Bold",
    color: "#000",
  },

/* closeButton: {
  width: 40,
  height: 40,
  backgroundColor: "red",
  borderRadius: 20,        
  alignItems: "center",
  justifyContent: "center",
  marginTop: -10
}, */


  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  form: {
    width: "100%",
  },

  inputGroup: {
    marginBottom: 20,
    marginHorizontal: 10,
  },

  label: {
    fontSize: 18,
    marginBottom: 6,
    fontFamily: "NotoSansLao-Bold",
    color: "#333",
  },

  inputField: {
    height: 55,
    borderColor: "#2C6BED",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },

submitButton: {
  height: 60,
  width: 200,
  backgroundColor: "#3B63B8",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 6,
},


  // ✅ Styles สำหรับผลการค้นหา
  searchResultsContainer: {
    position: "absolute", // ✅ สำคัญ: ให้มันลอยอิสระ ไม่ดันเนื้อหาอื่น
    top: 100, // ✅ ดันลงมาจากขอบบนของ Input (ปรับตามความสูง Input ของคุณ)
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2C6BED",
    maxHeight: 250,
    zIndex: 1000, // ✅ iOS: ให้แน่ใจว่าอยู่บนสุด
    elevation: 10, // ✅ Android: ให้เงาและลอยอยู่บนสุด
  },

  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    fontFamily: "NotoSansLao-Regular",
  },

  resultsList: {
    overflow: "scroll",
  },

  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  resultContent: {
    flex: 1,
  },

  resultCode: {
    fontSize: 16,
    fontFamily: "NotoSansLao-Bold",
    color: "#2C6BED",
    marginBottom: 4,
  },

  resultName: {
    fontSize: 15,
    fontFamily: "NotoSansLao-Regular",
    color: "#333",
    marginBottom: 2,
  },

  resultPhone: {
    fontSize: 13,
    fontFamily: "NotoSansLao-Regular",
    color: "#666",
  },

  noResultsContainer: {
    padding: 20,
    alignItems: "center",
  },

  noResultsText: {
    fontSize: 14,
    color: "#999",
    fontFamily: "NotoSansLao-Regular",
  },

  inputFieldSelected: {
    backgroundColor: "#f0f8ff",
    borderColor: "#4CAF50",
  },

  actionRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 5,
  marginHorizontal: 10,
},

warningText: {
  flex: 1,
  fontSize: 14,
  color: "red",
  fontFamily: "NotoSansLao-Regular",
  marginRight: 10,
},

});
