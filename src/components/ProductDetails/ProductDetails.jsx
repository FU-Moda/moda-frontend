import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import { formatPrice } from "../../utils/util";
import {
  clothTypeLabels,
  clothingSizeLabels,
  genderLabels,
  shoeSizeLabels,
} from "../../utils/constant";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState({});
  const [stock, setStock] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    selectedProduct.staticFile?.[0]?.img || ""
  );

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  useEffect(() => {
    getSelectedPrice();

    setStock(
      selectedProduct.productStock?.filter(
        (item) =>
          (item.clothingSize && item.clothingSize === Number(selectedSize)) ||
          (item.shoeSize && item.shoeSize === Number(selectedSize))
      )[0]
    );
  }, [selectedSize]);

  const handleAdd = (productItem, productStock, quantity) => {
    dispatch(
      addToCart({
        productItem: productItem,
        productStock: productStock,
        num: quantity,
      })
    );
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  const renderSizeOptions = () => {
    if (selectedProduct?.product?.clothType === 4) {
      // Render shoe size options
      return (
        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text">Size:</span>
          </label>
          <select
            id="size"
            value={selectedSize || ""}
            onChange={handleSizeChange}
            className="select select-bordered"
          >
            <option value="">Select a size</option>
            {selectedProduct?.productStock?.map((stock) => (
              <option key={stock.shoeSize} value={stock.shoeSize}>
                {shoeSizeLabels[stock.shoeSize]}
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      // Render clothing size options
      return (
        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text">Size:</span>
          </label>
          <select
            id="size"
            value={selectedSize || ""}
            onChange={handleSizeChange}
            className="select select-bordered"
          >
            <option value="">Select a size</option>
            {selectedProduct?.productStock?.map((stock) => (
              <option key={stock.clothingSize} value={stock.clothingSize}>
                {clothingSizeLabels[stock.clothingSize]}
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  const getSelectedPrice = () => {
    if (!selectedProduct || !selectedProduct?.productStock) {
      return "";
    }

    const isShoeProduct = selectedProduct?.product?.clothType === 4;

    const matchingStock = selectedProduct?.productStock?.find((stock) =>
      isShoeProduct
        ? stock.shoeSize === Number(selectedSize)
        : stock.clothingSize === Number(selectedSize)
    );

    return matchingStock ? formatPrice(matchingStock.price) : "";
  };

  return (
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="rounded-md shadow-lg">
          <div className="mb-10 w-full h-80">
            {selectedImage && (
              <img
                src={selectedImage}
                alt=""
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <div className="flex justify-center">
            {selectedProduct?.staticFile &&
              selectedProduct.staticFile.length > 0 &&
              selectedProduct.staticFile.map((item) => (
                <div
                  key={item.img}
                  className="w-24 h-24 p-2 shadow-md rounded-md cursor-pointer"
                  onClick={() => handleImageClick(item.img)}
                >
                  <img src={item.img} alt="" className="w-full h-full" />
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">
            {selectedProduct?.product?.name}
          </h2>
          <div className="flex items-center mb-4">
            <div className="rating rating-sm">
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-7"
                  className="mask mask-star-2 bg-orange-400"
                  checked
                  readOnly
                />
              ))}
            </div>
            {/* <span className="ml-2">{selectedProduct?.avgRating} ratings</span> */}
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <span className="text-xl font-semibold">
              {getSelectedPrice() ||
                formatPrice(
                  stock
                    ? stock.price
                    : selectedProduct?.productStock?.[0]?.price
                )}
            </span>
            {renderSizeOptions()}

            <div className="flex items-center">
              <span className="badge badge-ghost">
                {clothTypeLabels[selectedProduct?.product?.clothType]}
              </span>
              <span className="badge badge-ghost mx-2 ">
                {genderLabels[selectedProduct?.product?.gender]}
              </span>
            </div>
            <div className="flex items-center">
              <span className="badge badge-error text-white py-4">
                {stock
                  ? stock.quantity
                  : selectedProduct?.productStock?.[0]?.quantity}{" "}
                sản phẩm còn lại
              </span>
            </div>
          </div>

          <p className="mb-4">{selectedProduct?.shortDesc}</p>
          <div className="flex items-center mb-4">
            <div className="form-control w-24">
              <input
                type="number"
                placeholder="Số lượng"
                value={quantity}
                onChange={handleQuantityChange}
                className="input input-bordered"
              />
            </div>
            <button
              aria-label="Add"
              type="submit"
              className="btn text-white bg-primary ml-4"
              onClick={() => handleAdd(selectedProduct, stock, quantity)}
            >
              <i className="fa-solid fa-cart-arrow-down"></i>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
