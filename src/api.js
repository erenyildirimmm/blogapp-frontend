import axios from "axios";
import { API_BASE_URL } from "./config.js";
import { enqueueSnackbar } from "notistack";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const fetchData = async (method, endpoint, data = null, params = {}) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      method,
      url: endpoint,
      params,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    if (data) {
      config.data = data;
    }
    
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    console.error(`API isteği başarısız oldu (${method} ${endpoint}):`, error);
    // enqueueSnackbar("Hata!", { variant: "error" });
    throw error;
  }
};

export default fetchData;
