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

export const getAllOrderByShopId = async (id, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${baseUrl}/order/get-all-order-by-shop-id/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {}
};
