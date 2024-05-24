import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Home from "../Home";
const VerifyPayment = () => {
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  useEffect(() => {
    // Lấy các tham số từ URL
    const searchParams = new URLSearchParams(location.search);
    const vnpResponseCode = searchParams.get("vnp_ResponseCode");
    const partnerCode = searchParams.get("partnerCode");
    const resultCode = searchParams.get("resultCode");

    // Kiểm tra loại thanh toán và hiển thị thông báo phù hợp
    if (vnpResponseCode) {
      // Hiển thị thông báo VNPay
      const vnpOrderInfo = decodeURIComponent(
        searchParams.get("vnp_OrderInfo")
      );
      if (vnpResponseCode === "00") {
        setModalMessage(`Thanh toán VNPay thành công cho ${vnpOrderInfo}`);
      } else {
        setModalMessage(
          `Thanh toán VNPay thất bại cho đơn hàng: ${vnpOrderInfo}. Vui lòng thanh toán lại`
        );
      }
      setModalIsOpen(true);
    } else if (partnerCode === "MOMO") {
      // Hiển thị thông báo Momo
      const orderInfo = decodeURIComponent(searchParams.get("orderInfo"));
      if (resultCode === "0") {
        setModalMessage(`Thanh toán Momo thành công cho ${orderInfo}`);
      } else {
        setModalMessage(
          `Thanh toán Momo thất bại đơn hàng: ${orderInfo}. Vui lòng thanh toán lại`
        );
      }
      setModalIsOpen(true);
    }
  }, [location]);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <Home />
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="font-bold text-lg">Thông báo thanh toán</h2>
              <p className="py-4">{modalMessage}</p>
              <div className="modal-action">
                <button className="btn" onClick={closeModal}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default VerifyPayment;
