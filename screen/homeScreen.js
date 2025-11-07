import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import BottomNavigationBar from "../components/BottomNavigationBar";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("ຫນ້າຫຼັກ");

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.text}>Current Tab: {activeTab}</Text>
      </View>

      <BottomNavigationBar
        tabs={tabs}               // ส่ง tabs มาจาก Home
        activeTab={activeTab}     // ส่ง tab ปัจจุบัน
        onTabPress={handleTabPress} // ส่ง callback
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontFamily: "NotoSansLao-Bold" },
});
