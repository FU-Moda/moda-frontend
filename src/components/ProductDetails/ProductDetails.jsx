import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import { formatPrice } from "../../utils/Util";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            loading="lazy"
            src={selectedProduct?.staticFile?.img}
            alt=""
            className="w-400 h-auto object-contain"
          />
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
              {formatPrice(selectedProduct?.productStock?.price)}
            </span>
            <span>
              Phân loại:{selectedProduct?.product?.clothType}{" "}
              {selectedProduct?.product?.gender}
            </span>
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
            onClick={() => handleAdd(selectedProduct, quantity)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
