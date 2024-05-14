import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getProductByShopId, getShopById } from "../../api/productApi";
import { formatPrice } from "../../utils/util";
import Loader from "../../components/Loader/Loader";
const ShopProductList = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const [shopData, productData] = await Promise.all([
      getShopById(id),
      getProductByShopId(id, 1, 10),
    ]);
    if (shopData.isSuccess && productData.isSuccess) {
      setShop(shopData.result?.shop);
      setProducts(productData.result.items);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Loader isLoading={isLoading} />
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
                <p className="text-gray-600">
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
              <i className="fas fa-clock text-gray-600 mr-2"></i>
              <span className="text-gray-600">Tỉ lệ phản hồi: 95%</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-truck text-gray-600 mr-2"></i>
              <span className="text-gray-600">
                Vận chuyển từ: {shop?.address}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <NavLink to={`/shop/${product.product?.id}`}>
                  <div
                    key={product.product.id}
                    className="bg-white rounded-md shadow-md overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={product.staticFile[0]?.img}
                        alt={product.name}
                        className="w-full h-48 object-contain"
                      />
                      {product.isSale && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md">
                          Sale
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {product.product?.name}
                      </h3>
                      <div className="flex items-center mt-2">
                        <span className="text-red-500 font-bold">
                          {formatPrice(product.productStock[0]?.price)}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md mr-2">
                          {product.productStock[0]?.quantity}
                        </span>
                        <span className="text-gray-500">còn lại</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopProductList;
