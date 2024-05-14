import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { formatPrice } from "../../utils/util";

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
    toast.success("Product has been added to cart!");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative mb-4">
      {title === "Big Discount" && (
        <span className="absolute top-0 left-0 bg-[#0f3460] text-white px-2 py-1 rounded-full m-2 text-sm">
          {productItem.discount}% Off
        </span>
      )}
      <img
        loading="lazy"
        onClick={handleClick}
        src={productItem.staticFile[0]?.img}
        alt=""
        className="w-full h-48 object-contain cursor-pointer"
      />
      <div className="absolute top-0 right-0 m-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <ion-icon
          name="heart-outline"
          className="text-2xl text-gray-500 cursor-pointer"
        ></ion-icon>
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
            <ion-icon
              key={index}
              name="star"
              className="text-yellow-300 text-base"
            ></ion-icon>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <h4 className="font-bold">
            {" "}
            {formatPrice(productItem.productStock[0]?.price)}
          </h4>
          <button
            aria-label="Add"
            type="submit"
            className="bg-[#0f3460] text-white flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#0c2c4d] transition-colors duration-300"
            onClick={() => handleAdd(productItem, productItem.productStock[0])}
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
