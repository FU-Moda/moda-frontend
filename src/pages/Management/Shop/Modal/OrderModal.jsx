import {
  clothingSizeLabels,
  orderLabels,
  shoeSizeLabels,
} from "../../../../utils/constant";

const OrderModal = ({ item, onClose }) => {
  console.log(item);
  return (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-6xl">
        <div className="p-4 card shadow-lg compact bg-base-100 mt-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-primary ">
            Thông tin đơn hàng
          </h2>
          <div className="mb-2">
            <p className="mb-1">
              <strong>Tên khách hàng:</strong>{" "}
              {`${item.order?.account?.firstName} ${item.order?.account?.lastName}`}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {item.order?.account.email}
            </p>
            <p className="mb-1">
              <strong>Số điện thoại:</strong> {item.order?.account.phoneNumber}
            </p>
            <p className="mb-1">
              <strong>Giới tính:</strong>{" "}
              {item.order?.account.gender ? "Nam" : "Nữ"}
            </p>
            <p className="mb-1">
              <strong>Địa chỉ:</strong> {item.order?.account?.address}
            </p>
          </div>
        </div>

        <div className="p-4 card shadow-lg compact bg-base-100 mt-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-primary">
            Tóm tắt đơn hàng
          </h2>
          <div className="mb-2">
            <p className="mb-1">
              <strong>Mã đơn:</strong> {item.order.id}
            </p>
            <p className="mb-1">
              <strong>Ngày đặt hàng:</strong>{" "}
              {new Date(item.order.orderTime).toLocaleString()}
            </p>
            <p className="mb-1">
              <strong>Trạng thái:</strong> {orderLabels[item.order.status]}
            </p>
            <p className="mb-1">
              <strong>Phí giao hàng:</strong> {item.order.deliveryCost} VND
            </p>
            <p className="mb-1">
              <strong>Tổng đơn hàng:</strong> {item.order.total} VND
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
                {item.orderDetails.map((detail) => (
                  <tr key={detail.id} className="hover:bg-gray-100">
                    <td>{detail.productStock.product.name}</td>
                    <td>{detail.quantity}</td>
                    <td>{detail.productStock.price.toLocaleString()}</td>
                    <td>
                      {detail.productStock.shoeSize
                        ? shoeSizeLabels[detail.productStock.shoeSize]
                        : clothingSizeLabels[detail.productStock.clothingSize]}
                    </td>
                    <td>
                      {(
                        detail.quantity * detail.productStock.price
                      ).toLocaleString()}
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
  );
};

export default OrderModal;
