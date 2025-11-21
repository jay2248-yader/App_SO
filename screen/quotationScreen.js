import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, Platform, Modal,
  StatusBar, TouchableOpacity, Dimensions } from "react-native";
import { getQuotationAllProject } from "../services/quotationService";
import { getAllCustomers } from "../services/customersService";

import Input from "../components/Input";
import Button from "../components/Button";
import QuotationList from "../components/quotationList";
import CreateQuotation from "../components/createQuotation";

//Icon
import FilePlus from "../assets/Icon/file-plus-solid.svg";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

export default function QuotationScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // ✅ Customer List
  const customerList = [
    { label: "ພິມ ນິພະຍາ", value: "C001" },
    { label: "ກັນສະຫວາດ ລາວພູມ", value: "C002" },
    { label: "ວິລະໄຊ ພົມມະວົງ", value: "C003" },
  ];

  // 🚀 TEST CUSTOMER API
  useEffect(() => {
    const testCustomersAPI = async () => {
      try {
        console.log("🚀 Testing Customer API...");

        const res = await getAllCustomers({
          page: 1,
          limit: 20,
          search: "",
        });

        console.log("📦 Response from API:", res);

        if (res?.data_id?.rows) {
          console.log("📊 Row Count:", res.data_id.rows.length);
          console.log("🧩 First Row:", res.data_id.rows[0]);
        }

      } catch (err) {
        console.log("❌ API Error:", err);
      }
    };

    testCustomersAPI();
  }, []);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        setLoading(true);
        console.log('🚀 Starting to fetch quotations...');
        const data = await getQuotationAllProject();
        console.log('📦 Received data:', data);
        console.log('📏 Data length:', Array.isArray(data) ? data.length : 'Not an array');
        
        const quotationArray = Array.isArray(data) ? data : [data];
        console.log('✅ Setting quotations:', quotationArray.length, 'items');
        setQuotations(quotationArray);
      } catch (error) {
        console.error("❌ Error fetching quotations:", error);
        Alert.alert("Error", "ไม่สามารถโหลดข้อมูลใบเสนอราคาได้: " + (error.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchQuotations();
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  const handleCreateQuotation = () => {
    console.log("🎯 Opening CreateQuotation Modal...");
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    console.log("❌ Closing CreateQuotation Modal...");
    setShowCreateForm(false);
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
            onSubmit={() => console.log("กด Enter แล้ว:", searchText)}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="ສ້າງໃບສະເໜີ"
            onPress={handleCreateQuotation}
            icon={
              FilePlus ? (
                <FilePlus width={24} height={24} fill="#fff" />
              ) : (
                <Ionicons name="document-text-outline" size={24} color="#fff" />
              )
            }
            style={{
              backgroundColor: "#294aa5",
              height: 60, 
              borderRadius: 10,
            }}
          />
        </View>
      </View>

      {/* Quotation List */}
      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#294aa5" />
          </View>
        ) : (
          <QuotationList data={quotations} />
        )}
      </View>

      {/* ✅ Modal แบบ Dialog ตรงกลางหน้าจอ */}
      <Modal
        visible={showCreateForm}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseForm}
      >
        <View style={styles.modalOverlay}>
          {/* ✅ คลิกพื้นที่ด้านนอกเพื่อปิด */}
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleCloseForm}
          />
          
          {/* ✅ Dialog Container */}
          <View style={styles.dialogContainer}>
            <CreateQuotation 
              onClose={handleCloseForm}
              getAllCustomers={getAllCustomers}
              navigation={navigation}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    fontFamily: "NotoSansLao-Bold",
  },
  searchContainer: {
    paddingHorizontal: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // ✅ Modal Dialog Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dialogContainer: {
    width: width * 0.92,
    maxWidth: 600,
    height: height * 0.85,
    maxHeight: 800,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
});