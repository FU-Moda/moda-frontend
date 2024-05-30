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
const getAllProductByFilter = async (pageNumber, pageSize, data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/product/get-product-by-filter/${pageNumber}/${pageSize}`,
      data
    );
    return response.data;
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
const getProductStockByProductId = async (id) => {
  try {
    const data = await axios.get(
      `${baseUrl}/product/get-product-stock-by-product-id/${id}`
    );
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

const getShopById = async (id) => {
  try {
    const data = await axios.get(`${baseUrl}/shop/get-shop-by-id/${id}`);
    return data.data;
  } catch (error) {}
};
const getProductByShopId = async (id, pageNumber, pageSize) => {
  try {
    const data = await axios.get(
      `${baseUrl}/product/get-product-by-shop-id/${id}/${pageNumber}/${pageSize}`
    );
    return data.data;
  } catch (error) {}
};
const addNewProduct = async (data) => {
  try {
    const response = await axios.post(
      "https://moda-api.azurewebsites.net/product/add-new-product",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export {
  getAllProduct,
  getAllProductByFilter,
  getProductById,
  getRatingByProductId,
  getShopById,
  getProductByShopId,
  getProductStockByProductId,
  addNewProduct,
};
