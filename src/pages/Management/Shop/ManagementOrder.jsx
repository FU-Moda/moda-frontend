import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllOrderByShopId } from "../../../api/orderApi";
import Loader from "../../../components/Loader/Loader";
import { orderLabels } from "../../../utils/constant";
import OrderModal from "../Shop/Modal/OrderModal";
export const ManagementOrder = () => {
  const { shop } = useSelector((state) => state.shop || {});
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllOrderByShopId(shop.id, 1, 10);
    if (data.isSuccess) {
      setOrders(data.result?.items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [shop]);

  const handleExpand = (item) => {
    setIsOpen(true);
    setSelectedOrder(item);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <h1 className="text-center text-primary font-bold text-2xl uppercase my-4">
        Quản lý đơn hàng
      </h1>
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Đơn hàng</th>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Tổng cộng</th>
                <th>Phí giao hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Trạng thái</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr
                    key={order.order.id}
                    onClick={() => handleExpand(order)}
                    className="cursor-pointer"
                  >
                    <td>{order.order.id}</td>
                    <td>{`${order.order?.account?.firstName} ${order.order?.account?.lastName}`}</td>
                    <td>{order.order?.account?.phoneNumber}</td>
                    <td>{order.order?.account?.email}</td>
                    <td>{order.order?.total}</td>
                    <td>{order.order?.deliveryCost}</td>
                    <td>{new Date(order.order.orderTime).toLocaleString()}</td>
                    <td>{orderLabels[order.order?.status]}</td>
                    <td>
                      <button
                        className="btn bg-primary text-white"
                        onClick={() => handleExpand(order)}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {isOpen && <OrderModal item={selectedOrder} onClose={handleModalClose} />}
    </>
  );
};
