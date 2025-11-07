import api from "./api";

const LOGIN_ENDPOINT = process.env.EXPO_PUBLIC_ROUTE_LOGIN ;


export const login = async (username, password) => {
  try {
    const response = await api.post(LOGIN_ENDPOINT, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};