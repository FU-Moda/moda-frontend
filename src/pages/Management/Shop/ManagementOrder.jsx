import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllOrderByShopId } from "../../../api/orderApi";
import Loader from "../../../components/Loader/Loader";
import { orderLabels } from "../../../utils/constant";

export const ManagementOrder = () => {
  const { shop } = useSelector((state) => state.shop);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllOrderByShopId(shop.id, 1, 10);
    if (data.isSuccess) {
      setOrders(data.result.items);
      console.log(data.result.items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [shop]);

  const handleExpand = (items) => {
    setIsOpen(!isOpen);
    setOrderDetails(items);
  };

  const renderData = () => {
    return (
      <div className="overflow-x-auto mt-4 shadow-4xl rounded-md">
        <table className="table w-full table-zebra">
          <thead className="bg-primary text-white">
            <tr>
              <th className="text-center">Sản phẩm</th>
              <th className="text-center">Số lượng</th>
              <th className="text-center">Giá</th>
              <th className="text-center">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((orderItem) => (
              <tr key={orderItem.id}>
                <td className="text-center">
                  {orderItem.productStock.product.name}
                </td>
                <td className="text-center">{orderItem.quantity}</td>
                <td className="text-center">{orderItem.productStock.price}</td>
                <td className="text-center">
                  {orderItem.productStock.price * orderItem.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
                  <tr key={order.order.id}>
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
                        onClick={() => handleExpand(order.orderDetails)}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isOpen && renderData()}
        </div>
      )}
    </>
  );
};
