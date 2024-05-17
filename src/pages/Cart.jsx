import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { formatPrice } from "../utils/util";
import { clothingSizeLabels, shoeSizeLabels } from "../utils/constant";
import { createOrderWithPayment } from "../api/orderApi";
import { toast } from "react-toastify";
import { deleteCart } from "../redux/features/cartSlice";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.quantity * item.productStock?.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(cartList);
  const checkOut = async () => {
    const productStockDtos = cartList.map((item) => ({
      id: item.productStock.id,
      quantity: item.quantity,
    }));

    console.log({
      accountId: "7679876c-7414-44ba-aff6-960fe6739c05",
      productStockDtos,
    });
    const response = await createOrderWithPayment({
      accountId: "7679876c-7414-44ba-aff6-960fe6739c05",
      productStockDtos,
    });
    if (response.isSuccess) {
      toast.success("Đặt hàng thành công");
      dispatch(deleteCart());
      window.location.href = response.result;
    } else {
      toast.error("Đặt hàng thất bại");
    }
  };
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2gap-8">
        <div className="md:col-span-3">
          {cartList.length === 0 && (
            <h1 className="text-2xl font-bold">Không tồn tại sản phẩm nào</h1>
          )}
          {cartList.map((item) => {
            const productQty = item.productStock?.price * item.quantity;
            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center mb-8 border p-4 rounded-md shadow-md"
              >
                <div className="w-40 h-40 mb-4 md:mb-0">
                  <img
                    loading="lazy"
                    src={item.productItem?.staticFile[0]?.img}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col p-4 w-full  ">
                  <div className="md:w-2/3 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold mb-2">
                        {item.productItem?.product?.name}
                      </h3>
                      <div className="mb-2 flex">
                        <strong>Tổng tiền</strong>
                        <div className="mx-2">
                          {" "}
                          <span>{formatPrice(item.productStock?.price)}</span>
                          <span className="mx-2">x {item.quantity}</span>{" "}
                          <span>= {formatPrice(productQty)}</span>
                        </div>
                      </div>
                      <div className="my-2 flex ">
                        <strong>Phân loại</strong>
                        <span className="mx-2">
                          {item.productStock?.clothingSize !== null
                            ? clothingSizeLabels[
                                item.productStock?.clothingSize
                              ]
                            : shoeSizeLabels[item.productStock?.shoeSize]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l mr-2"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            productItem: item.productItem,
                            productStock: item.productStock,
                            num: 1,
                          })
                        )
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r mr-2"
                      onClick={() =>
                        dispatch(
                          decreaseQty({
                            productItem: item?.productItem,
                            productStock: item?.productStock,
                            num: 1,
                          })
                        )
                      }
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() =>
                        dispatch(
                          deleteProduct({ productStock: item.productStock })
                        )
                      }
                    >
                      X
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
      <div className="flex justify-end">
        <button
          className="bg-primary text-white text-end px-4 py-2 mt-4 rounded-md shadow-md"
          onClick={checkOut}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default Cart;
