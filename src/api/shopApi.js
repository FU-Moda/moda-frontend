import axios from "axios";
import { baseUrl } from "./config";

export const getAllShop = async (pageNumber, pageSize) => {
  try {
    const data = await axios.get(
      `${baseUrl}/shop/get-all-shop/${pageNumber}/${pageSize}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getShopByAccountId = async (accountId) => {
  try {
    const data = await axios.get(
      `${baseUrl}/shop/get-shop-by-accountId/${accountId}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const createShopAccount = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/shop/account/create-shop-account/`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getShopAffilateByShopId = async (shopId, pageNumber, pageSize) => {
  try {
    const data = await axios.get(
      `${baseUrl}/shop/get-shop-affiliate-by-shop-id/${shopId}/${pageNumber}/${pageSize}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTotalAffilate = async (shopId, startDate, endDate) => {
  try {
    const data = await axios.get(
      `${baseUrl}/shop/get-total-affiliate?shopId=${shopId}&startDate=${startDate}&endDate=${endDate}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getShopPackageByStatus = async (pageNumber, pageSize, status) => {
  try {
    const data = await axios.get(
      `${baseUrl}/shop/get-shop-package-by-status/${pageNumber}/${pageSize}?shopPackageStatus=${status}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
