import axios from "axios";
import { baseUrl } from "./config";

export const getUserReport = async (timePeriod, shopId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/dashboard/get-user-report?timePeriod=${timePeriod}${
        shopId ? `&shopId=${shopId}` : ""
      }`
    );
    return response.data;
  } catch (error) {}
};
export const getProductReport = async (timePeriod, shopId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/dashboard/get-product-report?timePeriod=${timePeriod}${
        shopId ? `&shopId=${shopId}` : ""
      }`
    );
    return response.data;
  } catch (error) {}
};
export const getRevenueReport = async (timePeriod, shopId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/dashboard/get-revenue-report?timePeriod=${timePeriod}${
        shopId ? `&shopId=${shopId}` : ""
      }`
    );
    return response.data;
  } catch (error) {}
};
