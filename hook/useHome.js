// src/hooks/useHomeScreen.js
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function useHomeScreen() {
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
    logout();
  };

  return {
    tabs,
    activeTab,
    handleTabPress,
    handleLogout,
    token,
    user,
  };
}
