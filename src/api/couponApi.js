import axios from "axios";
import { baseUrl } from "./config";

export const getAllCoupon = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${baseUrl}//coupon/get-all-coupon/${pageNumber}/${pageSize}`
    );
    return response.data;
  } catch (error) {}
};
