import axios from "axios"
import { baseUrl } from "./config";

const getAllProduct = async (pageNumber, pageSize) =>{
   try {
    const data = await axios.get(`${baseUrl}/product/get-all-product/${pageNumber}/${pageSize}`);
    return data.data;    
   } catch (error) {
    console.log(error);
   }
    
}

const getProductById = async (id)=>{
   try {
      const data = await axios.get(`${baseUrl}/product/get-product-by-id/${id}`);
      return data.data;    
     } catch (error) {
      console.log(error);
     }
}
export {getAllProduct,getProductById}