import axios from "axios";
import { baseUrl } from "./config";

export const getAllShop = async (pageNumber, pageSize) => {
  try {
    const data = await axios.get(
      `${baseUrl}/api/shop/get-all-shop/${pageNumber}/${pageSize}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getShopByAccountId = async (accountId) => {
  try {
    const data = await axios.get(
      `${baseUrl}/api/shop/get-shop-by-accountId/${accountId}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const createShopAccount = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/shop/account/create-shop-account/`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
