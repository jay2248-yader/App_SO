import { useState } from "react";
import { checkLogin } from "../services/chackLoginService";

export const useCheckLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleCheckLogin = async (username, wifiname, hardwarelogin) => {
    setLoading(true);
    setError(null);

    try {
      const result = await checkLogin(username, wifiname, hardwarelogin);
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    checkLogin: handleCheckLogin,
  };
};
