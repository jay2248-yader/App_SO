import { useState } from "react";
import { Alert } from "react-native";
import useDeviceInfo from "./useDeviceInfo";
import { login } from "../services/authService";
import { useCheckLogin } from "./useCheckLogin";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const { getDeviceInfo } = useDeviceInfo();
  const { checkLogin } = useCheckLogin();

  const handleLogin = async (username, password) => {
    if (!username || !password) {
      Alert.alert("ຜິດພາດ", "ກະລຸນາໃສ່ລະຫັດພະນັກງານ ແລະ ລະຫັດຜ່ານ");
      return;
    }

    setLoading(true);
    try {
      const deviceInfo = await getDeviceInfo();
      console.log("📱 Device Info:", deviceInfo);

      // Step 1: Check login first
      let networkIdentifier = deviceInfo.wifiName;

      // ถ้า Wi-Fi ไม่ได้ค่า ให้ใช้ IP แทน
      if (
        !networkIdentifier ||
        networkIdentifier === "Wi-Fi (No SSID)" ||
        networkIdentifier === "Not connected to Wi-Fi"
      ) {
        networkIdentifier = deviceInfo.ipAddress;
      }

      // Log ก่อนส่งไป checkLogin
      console.log("🔹 Sending to checkLogin:", {
        username,
        deviceName: deviceInfo.deviceName,
        networkIdentifier,
      });

      console.log("🔍 Checking login...");
      const checkResult = await checkLogin(
        username,
        deviceInfo.wifiName || deviceInfo.ipAddress,
        deviceInfo.deviceName
      );

      console.log("✅ Check login success:", checkResult);

      // Step 2: Proceed with actual login
      console.log("🔐 Proceeding with login...");
      const data = await login(username, password, deviceInfo);
      console.log("✅ Login success:", data);

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
        error.response?.data?.message || "ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
