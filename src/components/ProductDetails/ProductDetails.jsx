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
  const [stock, setStock] = useState({});

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  console.log(stock);
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
    console.log(selectedSize);
    console.log({
      productItem: productItem,
      productStock: productStock,
      num: quantity,
    });
    dispatch(
      addToCart({
        productItem: productItem,
        productStock: productStock,
        num: quantity,
      })
    );
    toast.success("Product has been added to cart!");
  };
  const renderSizeOptions = () => {
    if (selectedProduct?.product?.clothType === 4) {
      // Render shoe size options
      return (
        <div className="mb-4">
          <label htmlFor="size" className="block mb-2">
            Size:
          </label>
          <select
            id="size"
            value={selectedSize || ""}
            onChange={handleSizeChange}
            className="border border-black rounded-md px-3 py-2"
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
        <div className="mb-4">
          <label htmlFor="size" className="block mb-2">
            Size:
          </label>
          <select
            id="size"
            value={selectedSize || ""}
            onChange={handleSizeChange}
            className="border border-black rounded-md px-3 py-2"
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
  console.log(selectedSize);
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
    // console.log(matchingStock);

    return matchingStock ? formatPrice(matchingStock.price) : "";
  };
  return (
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="rounded-md shadow-lg">
          <div className="mb-10 w-full h-80">
            {selectedProduct?.staticFile &&
              selectedProduct.staticFile.length > 0 && (
                <img
                  src={selectedProduct.staticFile[0]?.img}
                  alt=""
                  className="w-full h-full object-contain"
                />
              )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="w-24 h-24 border p-2 m-4 shadow-md">
              {selectedProduct?.staticFile &&
                selectedProduct.staticFile.length > 0 && (
                  <img
                    src={selectedProduct.staticFile[0]?.img}
                    alt=""
                    className="w-full h-full "
                  />
                )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">
            {selectedProduct?.product?.name}
          </h2>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className="fa-solid fa-star text-yellow-300 text-lg"
                ></i>
              ))}
            </div>
            {/* <span className="ml-2">{selectedProduct?.avgRating} ratings</span> */}
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <span className="text-xl font-semibold">
              <span className="text-xl font-semibold">
                {getSelectedPrice() ||
                  formatPrice(selectedProduct?.productStock?.[0]?.price)}
              </span>{" "}
            </span>
            {renderSizeOptions()}

            <div className="flex">
              <span className="block"> Phân loại:</span>
              <span className="block mx-2">
                {clothTypeLabels[selectedProduct?.product?.clothType]}{" "}
              </span>
            </div>
            <div className="flex">
              <span className="block">Dành cho:</span>
              <span className="block mx-2">
                {genderLabels[selectedProduct?.product?.gender]}
              </span>
            </div>
          </div>

          <p className="mb-4">{selectedProduct?.shortDesc}</p>
          <input
            className="border border-black rounded-md px-3 py-2 mb-4 text-sm w-20"
            type="number"
            placeholder="Qty"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button
            aria-label="Add"
            type="submit"
            className="bg-[#0f3460] mx-8 text-white px-4 py-2 rounded-md hover:bg-[#0c2c4d] transition-colors duration-300"
            onClick={() => handleAdd(selectedProduct, stock, quantity)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
