import axios from "axios";
import { baseUrl } from "./config";

export const getAllConfiguration = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${baseUrl}/configuration/get-all-configuration/${pageNumber}/${pageSize}`
    );
    return response.data;
  } catch (error) {}
};
export const updateConfiguration = async (data) => {
  try {
    const response = await axios.put(
      `${baseUrl}/configuration/update-configuration/`,
      data
    );
    return response.data;
  } catch (error) {}
};
