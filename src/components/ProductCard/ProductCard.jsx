import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { formatPrice } from "../../utils/util";
import PurchaseSteps from "../Guide/PurchaseSteps";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleClick = () => {
    router(`/shop/${productItem.product.id}`);
  };

  const handleAdd = (productItem, productStock) => {
    dispatch(
      addToCart({
        productItem: productItem,
        productStock: productStock,
        num: 1,
      })
    );
    toast.success("Sản phẩm đã được thêm vào giỏ hàng");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative mb-4 border">
      <img
        loading="lazy"
        onClick={handleClick}
        src={productItem.staticFile[0]?.img}
        alt=""
        className="w-full h-48 object-contain cursor-pointer"
      />
      <div className="absolute top-0 right-0 m-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <i className="fa-solid fa-heart text-red-800"></i>
      </div>
      <div className="mt-2">
        <h3
          onClick={handleClick}
          className="font-semibold text-lg cursor-pointer"
        >
          {productItem.product?.name}
        </h3>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              class="fa-solid fa-star text-yellow-300 text-base"
            ></i>
          ))}
        
        </div>
        <div className="flex justify-end">
        <PurchaseSteps/>
        </div>
        <div className="flex flex-col flex-wrap  md:flex-row justify-between items-center my-2">
          <h4 className="font-bold text-red-600">
            {" "}
            {formatPrice(productItem.productStock[0]?.price)}
          </h4>
          <h4 className="line-through font-bold text-grey-600">
            {" "}
            {formatPrice((productItem.productStock[0]?.price * 120) / 100)}
          </h4>
          <button
            aria-label="Add"
            type="submit"
            className="bg-primary text-white flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#0c2c4d] transition-colors duration-300"
            onClick={() => handleAdd(productItem, productItem.productStock[0])}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="flex flex-col  md:flex-row items-center text-green-700">
          <i class="fa-solid fa-truck-fast"></i>
          <h4 className="mx-2">Miễn phí giao hàng 5 km</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
