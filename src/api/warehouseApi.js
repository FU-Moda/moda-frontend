import axios from "axios";
import { baseUrl } from "./config";

export const getAllWarehouse = async (pageNumber, pageSize) => {
  try {
    const data = await axios.get(
      `${baseUrl}/warehouse/get-all-warehouse/${pageNumber}/${pageSize}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
