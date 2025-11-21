import api from './api';

const GETQUOTATIONALLPROJECT_ENDPOINT = process.env.EXPO_PUBLIC_ROUTE_GETQUOTATIONAllPROJECT;

export const getQuotationAllProject = async () => {
  try {
    console.log('🔍 Calling API:', GETQUOTATIONALLPROJECT_ENDPOINT);
    const response = await api.get(GETQUOTATIONALLPROJECT_ENDPOINT);
    console.log('✅ API Response:', response.data);
    console.log('📊 Data array length:', response.data.data_id?.length || 0);
    return response.data.data_id || [];
  } catch (error) {
    console.error('❌ Get Quotation All Project error:', error.response?.data || error.message);
    console.error('❌ Full error:', error);
    throw error;
  }
};
