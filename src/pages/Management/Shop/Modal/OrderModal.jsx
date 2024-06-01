import { useEffect, useState } from "react";
import {
  clothingSizeLabels,
  orderLabels,
  shoeSizeLabels,
} from "../../../../utils/constant";
import { formatPrice } from "../../../../utils/util";
import { getAllOrderDetailsByOrderId } from "../../../../api/orderApi";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";

const OrderModal = ({ item, onClose }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllOrderDetailsByOrderId(item, 1, 100);
    if (data.isSuccess) {
      setOrderDetails(data.result);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [item]);
  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      <div className="modal modal-open">
        <div className="modal-box relative max-w-6xl">
          <div className="p-4 card shadow-lg compact bg-base-100 mt-4">
            <h2 className="text-2xl font-bold text-center mb-4 text-primary ">
              Thông tin đơn hàng
            </h2>
            <div className="mb-2">
              <p className="mb-1">
                <strong>Tên khách hàng:</strong>{" "}
                {`${orderDetails.order?.account?.firstName} ${orderDetails.order?.account?.lastName}`}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {orderDetails.order?.account?.email}
              </p>
              <p className="mb-1">
                <strong>Số điện thoại:</strong>{" "}
                {orderDetails.order?.account?.phoneNumber}
              </p>
              <p className="mb-1">
                <strong>Giới tính:</strong>{" "}
                {orderDetails.order?.account?.gender ? "Nam" : "Nữ"}
              </p>
              <p className="mb-1">
                <strong>Địa chỉ:</strong> {orderDetails.order?.account?.address}
              </p>
            </div>
          </div>

          <div className="p-4 card shadow-lg compact bg-base-100 mt-4">
            <h2 className="text-2xl font-bold text-center mb-4 text-primary">
              Tóm tắt đơn hàng
            </h2>
            <div className="mb-2">
              <p className="mb-1">
                <strong>Mã đơn:</strong> {orderDetails?.order?.id}
              </p>
              <p className="mb-1">
                <strong>Ngày đặt hàng:</strong>{" "}
                {new Date(orderDetails?.order?.orderTime).toLocaleString()}
              </p>
              <p className="mb-1">
                <strong>Trạng thái:</strong>{" "}
                {orderLabels[orderDetails?.order?.status]}
              </p>
              <p className="mb-1">
                <strong>Phí giao hàng:</strong>{" "}
                {formatPrice(orderDetails?.order?.deliveryCost)} VND
              </p>
              <p className="mb-1">
                <strong>Tổng đơn hàng:</strong>{" "}
                {formatPrice(orderDetails?.order?.total)} VND
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá (VND)</th>
                    <th>Size</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails &&
                    orderDetails.orderDetails?.length > 0 &&
                    orderDetails.orderDetails?.map((detail) => (
                      <tr key={detail.id} className="hover:bg-gray-100">
                        <td>{detail.productStock.product.name}</td>
                        <td>{detail.quantity}</td>
                        <td>{formatPrice(detail.productStock.price)}</td>
                        <td>
                          {detail.productStock.shoeSize
                            ? shoeSizeLabels[detail.productStock.shoeSize]
                            : clothingSizeLabels[
                                detail.productStock.clothingSize
                              ]}
                        </td>
                        <td>
                          {formatPrice(
                            detail.quantity * detail.productStock.price
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal-action">
            <button
              className="bg-primary border px-4 py-2 rounded-md text-white cursor-pointer hover:bg-primary-focus transition duration-200"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
