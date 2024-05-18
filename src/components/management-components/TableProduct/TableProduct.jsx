import { useState } from "react";
import { clothTypeLabels } from "../../../utils/constant";
import { ProductDetailModal } from "../../../pages/Management/Admin/ShopDetail/ProductDetailModal";
import { getRatingByProductId } from "../../../api/productApi";
import Loader from "../../../components/Loader/Loader";
export const TableProduct = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratings, setRating] = useState(null);

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
  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="overflow-x-auto shadow-md rounded-md">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Mô tả sản phẩm</th>
              <th>Giới tính</th>
              <th>Loại</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((item) => (
                <tr
                  key={item.product.id}
                  onClick={() => handleProductClick(item)}
                  className="cursor-pointer"
                >
                  <td>
                    <img
                      src={item.staticFile[0].img}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td>{item.product.name}</td>
                  <td>{item.product?.description}</td>
                  <td>
                    {item.product.gender === 0
                      ? "Nam"
                      : item.product.gender === 1
                      ? "Nữ"
                      : "Unisex"}
                  </td>
                  <td>{clothTypeLabels[item.product?.clothType]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <>
          <ProductDetailModal
            product={selectedProduct}
            ratings={ratings}
            onClose={handleModalClose}
          />
        </>
      )}
    </>
  );
};
