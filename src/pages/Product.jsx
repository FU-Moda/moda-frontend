import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getProductById } from "../api/productApi";
import Loader from "../components/Loader/Loader";
import RatingComponent from "../components/Rating/RatingComponent";
const Product = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getProductById(id);
    if (data.isSuccess) {
      setSelectedProduct(data.result);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  useWindowScrollToTop();

  return (
    <Fragment>
      <Loader isLoading={isLoading} />
      {isLoading === false && (
        <>
          <Banner title={selectedProduct?.product?.name} />
          <ProductDetails selectedProduct={selectedProduct} />
          {/* <ProductReviews selectedProduct={selectedProduct} /> */}
          <div className="container mx-auto py-8">
            <div class="flex items-center bg-white shadow-md rounded-lg p-4">
              <div class="flex-shrink-0 mr-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Shop Logo"
                  class="w-16 h-16 rounded-full"
                />
              </div>
              <div class="flex-grow">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="text-lg font-semibold">LeMode</h3>
                  <a
                    href="#"
                    class="text-sm text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Xem Shop
                  </a>
                </div>
                <p class="text-gray-600 mb-2">Shop chuyên quần áo 2nd</p>
                <div class="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-gray-600">
                    Lê Văn Việt, Thành phố Thủ Đức
                  </span>
                </div>
                <div class="flex items-center">
                  <div class="flex items-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-yellow-400 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-gray-600">4.8</span>
                  </div>
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-green-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-gray-600">Tỉ lệ phản hồi 95%</span>
                  </div>
                </div>
              </div>
            </div>
            <RatingComponent id={id} />
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Product;
