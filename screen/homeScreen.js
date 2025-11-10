import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { useAuthStore } from "../store/authStore";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("ຫນ້າຫຼັກ");
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const tabs = [
    { name: "ຫນ້າຫຼັກ", icon: "home-outline" },
    { name: "ລູກຄ້າ", icon: "person-outline" },
    { name: "ໃບສະເໜີລາຄາ", icon: "document-text-outline" },
    { name: "ລາຍງານ", icon: "bar-chart-outline" },
    { name: "ການຕັ້ງຄ່າ", icon: "settings-outline" },
  ];

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    console.log("Tab pressed:", tabName);
  };

  const handleLogout = () => {
    logout(); // ✅ ล้าง token และ user (navigation จะเปลี่ยนอัตโนมัติ)
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.text}>Current Tab: {activeTab}</Text>

        {/* แสดงข้อมูลจาก MMKV Store */}
        <View style={styles.storeInfo}>
          <Text style={styles.label}>Token:</Text>
          <Text style={styles.value}>{token || "ບໍ່ມີ Token"}</Text>
          
          <Text style={styles.label}>User:</Text>
          <Text style={styles.value}>
            {user ? JSON.stringify(user, null, 2) : "ບໍ່ມີຂໍ້ມູນ User"}
          </Text>
        </View>

        {/* ✅ ปุ่ม Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <BottomNavigationBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  text: { fontSize: 22, fontFamily: "NotoSansLao-Bold", marginBottom: 20 },
  storeInfo: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontFamily: "NotoSansLao-Bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  value: {
    fontSize: 14,
    fontFamily: "NotoSansLao-Regular",
    color: "#666",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
  },
  logoutButton: {
    backgroundColor: "#FF4D4F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NotoSansLao-Bold",
  },
});
