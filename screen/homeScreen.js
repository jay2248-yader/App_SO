// src/screen/HomeScreen.js
import React from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import BottomNavigationBar from "../components/BottomNavigationBar";
import useHomeScreen from "../hook/useHome";

export default function HomeScreen() {
  const {
    tabs,
    activeTab,
    handleTabPress,
    handleLogout,
    token,
    user,
  } = useHomeScreen();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.text}>Current Tab: {activeTab}</Text>

        {/* แสดงข้อมูลจาก Store */}
        <View style={styles.storeInfo}>
          <Text style={styles.label}>Token:</Text>
          <Text style={styles.value}>{token || "ບໍ່ມີ Token"}</Text>

          <Text style={styles.label}>User:</Text>
          <Text style={styles.value}>
            {user ? JSON.stringify(user, null, 2) : "ບໍ່ມີຂໍ້ມູນ User"}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>


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
