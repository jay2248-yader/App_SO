import { useCallback } from "react";
import * as Device from "expo-device";
import * as Network from "expo-network";
import * as Location from "expo-location";

export default function useDeviceInfo() {
  const getDeviceInfo = useCallback(async () => {
    try {
      let wifiName = "Unknown Wi-Fi";
      let ipAddress = "Unknown IP";
      let connectionType = "Unknown";

      // ขอสิทธิ์ location เพื่อดึง Wi-Fi SSID
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const networkState = await Network.getNetworkStateAsync();
        connectionType = networkState.type || "Unknown";

        if (networkState.type === Network.NetworkStateType.WIFI) {
          wifiName = networkState?.details?.ssid || "Wi-Fi (No SSID)";
        } else {
          wifiName = "Not connected to Wi-Fi";
        }

        ipAddress = await Network.getIpAddressAsync();
      } else {
        wifiName = "Permission denied";
      }

      // คืนค่าเฉพาะ deviceName + network info
      return {
        deviceName: Device.deviceName || Device.modelName || "Unknown Device",
        wifiName,
        ipAddress,
        connectionType,
      };
    } catch (error) {
      console.error("Error getting device info:", error);
      return {
        deviceName: "Unknown Device",
        wifiName: "Unknown",
        ipAddress: "Unknown",
        connectionType: "Unknown",
      };
    }
  }, []);

  return { getDeviceInfo };
}
