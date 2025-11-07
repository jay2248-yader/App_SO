import api from "./api";

const CHECKLOGIN_ENDPOINT = process.env.EXPO_PUBLIC_ROUTE_CHECKLOGIN ;

export const checkLogin = async (username, wifiname, hardwarelogin ) => {
  try {
    const response = await api.post(CHECKLOGIN_ENDPOINT, {
      username,
      wifiname,
      hardwarelogin,
    });
    return response.data;
  } catch (error) {
    console.error("Check login error:", error.response?.data || error.message);
    throw error;
  }
} 