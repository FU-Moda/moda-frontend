import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductByShopId,
  getRatingByProductId,
  getShopById,
} from "../../../../api/productApi";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
import { ProductDetailModal } from "./ProductDetailModal";
import { clothTypeLabels } from "../../../../utils/constant";
import RatingComponent from "../../../../components/Rating/RatingComponent";
import { TableProduct } from "../../../../components/management-components/TableProduct/TableProduct";
export const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [ratings, setRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = async (product) => {
    setIsLoading(true);
    setSelectedProduct(product);
    const data = await getRatingByProductId(product.product?.id, 1, 10);
    if (data.isSuccess) {
      setRating(data.result?.items);
    }
    setIsModalOpen(true);
    setIsLoading(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const [shopData, productData] = await Promise.all([
      getShopById(id),
      getProductByShopId(id, 1, 10),
    ]);
    if (shopData.isSuccess && productData.isSuccess) {
      setShop(shopData.result?.shop);
      setProducts(productData.result?.items);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      {!isLoading && (
        <>
          <div className="bg-white rounded-md shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <img
                src={shop?.logo}
                alt={shop?.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">{shop?.name}</h1>
                <p className="text-grey-600">
                  90+ sản phẩm | 4.5
                  <span className="text-yellow-400">★</span>
                </p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <i className="fas fa-map-marker-alt text-gray-600 mr-2"></i>
              <span className="text-gray-600">{shop?.address}</span>
            </div>
            <div className="flex items-center mb-2">
              <i className="fas fa-clock text-green-600 mr-2"></i>
              <span className="text-green-600">Tỉ lệ phản hồi: 95%</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-truck text-orange-600 mr-2"></i>
              <span className="text-orange-600">
                Vận chuyển từ: {shop?.address}
              </span>
            </div>
          </div>
          <TableProduct products={products} />
        </>
      )}
    </>
  );
};
