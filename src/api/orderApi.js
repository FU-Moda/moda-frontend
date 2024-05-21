import axios from "axios";
import { baseUrl } from "./config";

export const createOrderWithPayment = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/order/create-order-with-payment`,
      data
    );
    return response.data;
  } catch (error) {}
};
export const createOrderCOD = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/order/create-order-cod`,
      data
    );
    return response.data;
  } catch (error) {}
};

export const getAllOrderByShopId = async (id, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${baseUrl}/order/get-all-order-by-shop-id/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {}
};
export const getAllOrderByAccountId = async (id, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${baseUrl}/order/get-all-order-by-account-id/${id}/${pageNumber}/${pageSize}`
    );
    return response.data;
  } catch (error) {}
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${baseUrl}/order/update-status?orderId=${id}&orderStatus=${status}`
    );
    return response.data;
  } catch (error) {}
};
export const getAllOrderDetailsByOrderId = async (id, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${baseUrl}/order/get-all-order-detail-by-order-id/${id}/${pageNumber}/${pageSize}`
    );
    return response.data;
  } catch (error) {}
};
