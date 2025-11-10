import { useState } from "react";
import { Alert } from "react-native";
import useDeviceInfo from "./useDeviceInfo";
import { login } from "../services/authService";
import { useCheckLogin } from "./useCheckLogin";
import { useAuthStore } from "../store/authStore"; // ✅ import store เข้ามา

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const { getDeviceInfo } = useDeviceInfo();
  const { checkLogin } = useCheckLogin();

  // ✅ ดึง setToken / setUser จาก Zustand
  const { setToken, setUser } = useAuthStore();

  const handleLogin = async (username, password) => {
    if (!username || !password) {
      Alert.alert("ຜິດພາດ", "ກະລຸນາໃສ່ລະຫັດພະນັກງານ ແລະ ລະຫັດຜ່ານ");
      return;
    }

    setLoading(true);
    try {
      const deviceInfo = await getDeviceInfo();
      console.log("📱 Device Info:", deviceInfo);

      // ✅ ดึง networkIdentifier
      let networkIdentifier = deviceInfo.wifiName;
      if (
        !networkIdentifier ||
        networkIdentifier === "Wi-Fi (No SSID)" ||
        networkIdentifier === "Not connected to Wi-Fi"
      ) {
        networkIdentifier = deviceInfo.ipAddress;
      }

      // ✅ Check login ก่อน
      console.log("🔹 Sending to checkLogin:", {
        username,
        deviceName: deviceInfo.deviceName,
        networkIdentifier,
      });
      const checkResult = await checkLogin(
        username,
        deviceInfo.wifiName || deviceInfo.ipAddress,
        deviceInfo.deviceName
      );
      console.log("✅ Check login success:", checkResult);

      // ✅ Login จริง
      console.log("🔐 Proceeding with login...");
      const data = await login(username, password, deviceInfo);
      console.log("✅ Login success:", data);

      // ✅ เก็บ token และ user ลงใน store
      const token = data?.data_id?.token;
      if (token) {
        setToken(token);
        setUser({
          code: data.data_id.CODE,
          name: data.data_id.MYNAMETH,
          active: data.data_id.ACTIVEPUBLIC,
        });

        console.log("🟢 Token saved to store:", token);

        console.log("🔹 Token from store:", useAuthStore.getState().token);
      }

      // ✅ แสดงผลบน Alert
      const deviceDisplay = `ອຸປະກອນທີ່ເຂົ້າສູ່ລະບົບ:

📱 ຊື່ອຸປະກອນ: ${deviceInfo.deviceName}
📶 ຊື່ Wi-Fi: ${deviceInfo.wifiName}
🌐 ທີ່ຢູ່ IP: ${deviceInfo.ipAddress}
📡 ປະເພດການເຊື່ອມຕໍ່: ${deviceInfo.connectionType}
`;

      Alert.alert("✅ ເຂົ້າສູ່ລະບົບສຳເລັດ", deviceDisplay, [
        {
          text: "ຕົກລົງ",
          onPress: () => {
            console.log("Navigate to Home");
          },
        },
      ]);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "ເກີດຂໍ້ຜິດພາດ",
        error.response?.data?.message ||
          "ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
