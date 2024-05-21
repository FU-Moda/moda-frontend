import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { formatPrice } from "../utils/util";
import { clothingSizeLabels, shoeSizeLabels } from "../utils/constant";
import { createOrderCOD, createOrderWithPayment } from "../api/orderApi";
import { toast } from "react-toastify";
import { deleteCart } from "../redux/features/cartSlice";
import PaymentMethod from "../components/PaymentMethod/PaymentMethod";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart || []);
  const { user } = useSelector((state) => state.user || {});
  const [selectedMethod, setSelectedMethod] = useState("");
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.quantity * item.productStock?.price,
    0
  );
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(cartList);
  const checkOut = async () => {
    const productStockDtos = cartList.map((item) => ({
      id: item.productStock.id,
      quantity: item.quantity,
    }));

    if (cartList.length > 0 && user != null) {
      if (selectedMethod === "vnpay") {
        const response = await createOrderWithPayment({
          accountId: user.id,
          productStockDtos,
        });
        if (response.isSuccess) {
          toast.success("Đặt hàng thành công");
          dispatch(deleteCart());
          window.location.href = response.result;
        } else {
          toast.error("Đặt hàng thất bại");
        }
      } else {
        const response = await createOrderCOD({
          accountId: user.id,
          productStockDtos,
        });
        if (response.isSuccess) {
          toast.success("Đặt hàng thành công");
          dispatch(deleteCart());
          navigate("/");
        } else {
          toast.error("Đặt hàng thất bại");
        }
      }
    }
  };

  const log = (data) => {
    setSelectedMethod(data);
  };
  return (
    <div className="container mx-auto py-8">
      {user ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2gap-8">
            <div className="card bg-base-100 shadow-xl mb-4">
              <div className="card-body">
                <h2 className="card-title">Thông tin khách hàng</h2>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Tên khách hàng:</span>
                    <span>{`${user?.firstName} ${user.lastName}`}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Email:</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Số điện thoại:</span>
                    <span>{user?.phoneNumber}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Giới tính:</span>
                    <span>{user?.gender ? "Nam" : "Nữ"}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Địa chỉ:</span>
                    <span>{user?.address}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              {cartList.length === 0 && (
                <h1 className="text-2xl font-bold">
                  Không tồn tại sản phẩm nào
                </h1>
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
                              <span>
                                {formatPrice(item.productStock?.price)}
                              </span>
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

            <div className=" rounded-box p-6">
              <PaymentMethod log={log} />

              <div className="divider"></div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Giỏ hàng</h2>
                <h3 className="text-xl font-bold">
                  Tổng tiền: {formatPrice(totalPrice)}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-primary text-white text-end px-4 py-2 mt-4 rounded-md shadow-md mx-4"
              onClick={checkOut}
            >
              Đặt hàng
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center font-semibold text-lg">
            Bạn vui lòng đăng nhập để xem giỏ hàng
          </h1>
        </>
      )}
    </div>
  );
};

export default Cart;
