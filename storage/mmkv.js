// src/storage/mmkv.js
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  id: "auth-storage",
});
