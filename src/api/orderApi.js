import axios from "axios";
import { baseUrl } from "./config";

const createOrderWithPayment = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/order/create-order-with-payment`,
      data
    );
    return response.data;
  } catch (error) {}
};
export { createOrderWithPayment };
