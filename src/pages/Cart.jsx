import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderCOD, createOrderWithPayment } from "../api/orderApi";
import { toast } from "react-toastify";
import { deleteCart } from "../redux/features/cartSlice";
import PaymentMethod from "../components/PaymentMethod/PaymentMethod";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import CouponList from "../components/Coupon/CouponList";
import { getAllCoupon } from "../api/couponApi";
import CartList from "../components/Cart/CartList";
import CartSummary from "../components/Cart/CartSummary";
import UserInfo from "../components/Cart/UserInfo";
import qrPayment from "../Images/qr-payment.jpg";
import { Modal, Button } from "antd";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart || []);
  const { user } = useSelector((state) => state.user || {});
  const selectedCoupon = useSelector(
    (state) => state.cart.selectedCoupon || ""
  );
  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [couponList, setCouponList] = useState([]);
  const totalPrice = cartList.reduce(
    (price, item) => price + item.quantity * item.productStock?.price,
    0
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await checkOut();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = await getAllCoupon(1, 10);
    if (data.isSuccess) {
      setCouponList(data.result.items);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  const checkOut = async () => {
    setLoading(true);
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
          response.messages.forEach((message) => {
            toast.error(message);
          });
          setLoading(false);
        }
      } else {
        const response = await createOrderCOD({
          accountId: user.id,
          productStockDtos,
          couponId: selectedCoupon,
        });
        if (response.isSuccess) {
          toast.success("Đặt hàng thành công");
          dispatch(deleteCart());
          navigate("/");
        } else {
          response.messages.forEach((message) => {
            toast.error(message);
          });
        }
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const log = (data) => {
    setSelectedMethod(data);
  };
  return (
    <div className="container mx-auto py-8">
      <LoadingComponent isLoading={loading} />
      {user ? (
        <>
          <div className="grid grid-cols-1">
            <div className="card bg-base-100 shadow-xl mb-4">
              <div className="card-body">
                <h2 className="card-title">Thông tin khách hàng</h2>
                <UserInfo user={user} />
              </div>
            </div>
            <CartList cartList={cartList} dispatch={dispatch} />

            <div className=" rounded-box p-6">
              <PaymentMethod log={log} />

              <div className="divider"></div>

              <CartSummary totalPrice={totalPrice} />
            </div>
          </div>
          <CouponList items={couponList} />
          <div className="flex justify-end">
            <button
              className="bg-primary text-white text-end px-4 py-2 mt-4 rounded-md shadow-md mx-4"
              onClick={showModal}
            >
              Đặt hàng
            </button>
            <Modal
              title="Xác nhận thanh toán"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Xác nhận bạn đã thanh toán:</p>
              <img src={qrPayment} alt="QR Code" className="w-full h-full" />
            </Modal>
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
