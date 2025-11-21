import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// ✅ Interceptor สำหรับเพิ่ม token อัตโนมัติ
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // ดึง token จาก Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
