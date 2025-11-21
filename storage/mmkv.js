// src/storage/mmkv.js
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  id: "auth-storage",
  encryptionKey: "dev_secret_key_1234", // 🔐 ใช้ key จริงของคุณเอง
  logLevel: "none",
});
