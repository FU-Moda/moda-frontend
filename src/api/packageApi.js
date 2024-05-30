import axios from "axios";
import { baseUrl } from "./config";

export const createOptionPackage = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/option-package/create-option-package`,
      data
    );
    return response.data;
  } catch (error) {}
};
export const updateOptionPackage = async (id, data) => {
  try {
    const response = await axios.put(
      `${baseUrl}/option-package/update-option-package?packageId=${id}`,
      data
    );
    return response.data;
  } catch (error) {}
};
export const deleteOptionPackage = async (id) => {
  try {
    const response = await axios.post(
      `${baseUrl}/option-package/delete-option-package?packageId=${id}`
    );
    return response.data;
  } catch (error) {}
};
export const getAllOptionPackage = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${baseUrl}/option-package/get-all-option-package/${pageNumber}/${pageSize}`
    );
    return response.data;
  } catch (error) {}
};
