import axios from "axios";
import { baseUrl } from "./config";

export const getAllShop = async (pageNumber, pageSize) => {
  try {
    const data = await axios.get(
      `${baseUrl}/get-all-shop/${pageNumber}/${pageSize}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getShopByAccountId = async (accountId) => {
  try {
    const data = await axios.get(
      `${baseUrl}/get-shop-by-accountId/${accountId}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
