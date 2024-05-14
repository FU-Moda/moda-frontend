import axios from "axios";
import { baseUrl } from "./config";

const getAllProduct = async (pageNumber, pageSize) => {
  try {
    const data = await axios.get(
      `${baseUrl}/product/get-all-product/${pageNumber}/${pageSize}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (id) => {
  try {
    const data = await axios.get(`${baseUrl}/product/get-product-by-id/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
const getRatingByProductId = async (id, pageNumber, pageSize) => {
  try {
    const data = await axios.get(
      `${baseUrl}/product/get-rating-by-product-id/${id}/${pageNumber}/${pageSize}`
    );
    return data.data;
  } catch (error) {}
};
export { getAllProduct, getProductById, getRatingByProductId };
