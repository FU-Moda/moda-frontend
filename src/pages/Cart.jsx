import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { formatPrice } from "../utils/util";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.productStock?.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2gap-8">
        <div className="md:col-span-3">
          {cartList.length === 0 && (
            <h1 className="text-2xl font-bold">Không tồn tại sản phẩm nào</h1>
          )}
          {cartList.map((item) => {
            const productQty = item.productStock?.price * item.qty;
            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center mb-8 border p-4 rounded-md shadow-md"
              >
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <img
                    loading="lazy"
                    src={item.staticFile?.img}
                    alt=""
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex flex-col p-4">
                  <div className="md:w-2/3 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold mb-2">
                        {item.product?.name}
                      </h3>
                      <h4 className="mb-2">
                        {formatPrice(item.productStock?.price)} x {item.qty} ={" "}
                        <span>{formatPrice(productQty)}</span>
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l mr-2"
                      onClick={() =>
                        dispatch(addToCart({ product: item, num: 1 }))
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r mr-2"
                      onClick={() => dispatch(decreaseQty(item))}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold">Tổng tiền:</h4>
            <h3 className="text-xl font-bold">{formatPrice(totalPrice)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
