// src/services/customersService.js
import api from "./api";

const ROUTE_GET_ALL_CUSTOMERS = process.env.EXPO_PUBLIC_ROUTE_GETALLCUSTOMERS;

export const getAllCustomers = async ({ page = 1, limit = 20, search = "" }) => {
  try {
    console.log("🚀 [API CALL] getAllCustomers()");
    console.log("🔍 Params:", { page, limit, search });
    console.log("🛣️ Using route:", ROUTE_GET_ALL_CUSTOMERS);

    const response = await api.get(ROUTE_GET_ALL_CUSTOMERS, {
      params: { page, limit, search },
    });

    console.log("📦 API Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ [API ERROR] getAllCustomers:", error);
    throw error;
  }
};
