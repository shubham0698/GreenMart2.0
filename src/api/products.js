import axios from "axios";

const API_URL = "http://localhost:5000"; // your backend URL

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
  } catch (err) {
    console.log("API Error:", err);
    return [];
  }
};
