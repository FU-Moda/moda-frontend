import { useEffect, useState } from "react";
import { Tabs, DatePicker, Pagination, message, Tooltip } from "antd";
import { useSelector } from "react-redux";
import {
  getAllOrderByShopId,
  getAllOrderByStusAndShopId,
  updateOrderStatus,
} from "../../../api/orderApi";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import { orderLabels } from "../../../utils/constant";
import OrderModal from "../Shop/Modal/OrderModal";
import {
  getShopAffilateByShopId,
  getTotalAffilate,
  getTotalOrderDetailAffilate,
} from "../../../api/shopApi";
import { formatPrice } from "../../../utils/util";
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
import moment from "moment";
export const ManagementOrder = () => {
  const { shop } = useSelector((state) => state.shop || {});
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [affiliates, setAffiliates] = useState({});
  const [totalAffiliate, setTotalAffiliate] = useState(0);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );
  const [activeChildTab, setActiveChildTab] = useState(
    localStorage.getItem("activeChildTab") || "1"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const fetchData = async (page, size) => {
    setIsLoading(true);
    try {
      const orderData = await getAllOrderByStusAndShopId(
        shop.id,
        page,
        size,
        activeChildTab
      );
      if (orderData.isSuccess) {
        setOrders(orderData.result?.items);
        setTotalPage(orderData.result.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [totalPage, setTotalPage] = useState(0);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    fetchData(page, pageSize);
  };
  const handleExpand = (orderId) => {
    setSelectedOrder(orderId);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleUpdateStatus = async (orderId) => {
    try {
      const response = await updateOrderStatus(orderId);
      if (response.isSuccess) {
        message.success("Order status updated successfully");
        fetchData(); // Gọi lại hàm fetchData để cập nhật dữ liệu
      } else {
        message.error("Failed to update order status");
      }
    } catch (error) {
      message.error("An error occurred while updating order status");
    }
  };
  const renderOrderRow = (order) => (
    <tr key={order.id} className="cursor-pointer">
      <td>{order.id}</td>
      <td>{`${order?.account?.firstName} ${order?.account?.lastName}`}</td>
      <td>{order?.account?.phoneNumber}</td>
      <td>{order?.account?.email}</td>

      <td>{new Date(order.orderTime).toLocaleString()}</td>
      <td>{orderLabels[order?.status]}</td>
      <td>{formatPrice(order?.total)}</td>
      <td>{formatPrice(order?.deliveryCost)}</td>
      <td>
        <Tooltip
          title={
            order.status === 1
              ? "Đã chuẩn bị hàng xong"
              : "Đã giao hàng thành công"
          }
        >
          <i
            className="fas fa-check-circle text-green-500 cursor-pointer"
            onClick={() => handleUpdateStatus(order.id)}
          />
        </Tooltip>
        <Tooltip title="Xem chi tiết">
          <i
            className="mx-6 fa-solid fa-eye cursor-pointer"
            onClick={() => handleExpand(order.id)}
          ></i>
        </Tooltip>
      </td>
    </tr>
  );
  const renderAffiliateRow = (affiliate) => (
    <tr
      key={affiliate.id}
      className="cursor-pointer"
      onClick={() => handleExpand(affiliate?.order.id)}
    >
      <td>{affiliate.order?.id}</td>
      <td>{`${affiliate.order?.account?.firstName} ${affiliate.order?.account?.lastName}`}</td>
      <td>{affiliate.order?.account?.phoneNumber}</td>
      <td>{affiliate.order?.account?.email}</td>
      <td>{orderLabels[affiliate.order?.status]}</td>
      <td>{new Date(affiliate.order?.orderTime).toLocaleString()}</td>
      <td>{formatPrice(affiliate.order?.total)}</td>
      <td>{formatPrice(affiliate.order?.deliveryCost)}</td>
      <td>{formatPrice(affiliate.profit)}</td>
    </tr>
  );
  const handleDateChange = async (dates) => {
    console.log(dates);
    if (!dates || dates.length < 2) {
      console.error("Both start and end dates must be selected");
      return;
    }
    setIsLoading(true);
    try {
      const startDate = new Date(dates[0]).toISOString();
      const endDate = new Date(dates[1]).toISOString();
      const response = await getTotalAffilate(shop.id, startDate, endDate);
      const affilateData = await getTotalOrderDetailAffilate(
        shop.id,
        startDate,
        endDate
      );
      if (response.isSuccess) {
        setTotalAffiliate(response.result);
      }
      if (affilateData.isSuccess) {
        setAffiliates(affilateData.result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
    localStorage.setItem("activeTab", key);
  };
  const handleTabChildChange = (key) => {
    setActiveChildTab(key);
    localStorage.setItem("activeChildTab", key);
  };
  useEffect(() => {
    fetchData(currentPage, pageSize);
    handleDateChange([
      moment().utcOffset(420).subtract(1, "months").toDate(),
      moment().utcOffset(420).toDate(),
    ]);
  }, [shop, activeChildTab, currentPage, pageSize, activeTab]);
  return (
    <>
      <Tabs defaultActiveKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Quản lí đơn hàng" key="1">
          <LoadingComponent isLoading={isLoading} />
          <h1 className="text-center text-primary font-bold text-2xl uppercase my-4">
            Quản lý đơn hàng
          </h1>
          <Tabs defaultActiveKey="1" onChange={handleTabChildChange}>
            <TabPane tab="Chuyển cho Shop" key="1">
              <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                  <thead>
                    <tr>
                      <th>Đơn hàng</th>
                      <th>Tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Ngày đặt hàng</th>
                      <th>Trạng thái</th>
                      <th>Tổng cộng</th>
                      <th>Phí giao hàng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{orders && orders.map(renderOrderRow)}</tbody>
                </table>
              </div>
            </TabPane>
            <TabPane tab="Chuyển cho Giao hàng" key="2">
              <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                  <thead>
                    <tr>
                      <th>Đơn hàng</th>
                      <th>Tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Ngày đặt hàng</th>
                      <th>Trạng thái</th>
                      <th>Tổng cộng</th>
                      <th>Phí giao hàng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{orders && orders.map(renderOrderRow)}</tbody>
                </table>
              </div>
            </TabPane>
          </Tabs>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalPage}
            onChange={handlePageChange}
          />
        </TabPane>
        <TabPane tab="Shop Affiliate" key="2">
          <LoadingComponent isLoading={isLoading} />
          <h1 className="text-center text-primary font-bold text-2xl uppercase my-4">
            Shop Affiliate
          </h1>
          <RangePicker
            onChange={handleDateChange}
            defaultValue={[
              moment().utcOffset(420).subtract(1, "months"),
              moment().utcOffset(420),
            ]}
            format="DD/MM/YYYY"
          />
          <h2 className="animate-text-animation text-center text-primary font-bold  my-4">
            Tổng số tiền cần phải trả cho MODA: {formatPrice(totalAffiliate)}
          </h2>
          <h2 className=" text-center text-primary font-bold  my-4">
            Tổng số tiền lời: {formatPrice(affiliates.totalProfit)}
          </h2>
          {!isLoading && (
            <div className="overflow-x-auto">
              <table className="table w-full table-zebra">
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Ngày đặt hàng</th>
                    <th>Trạng thái</th>
                    <th>Tổng cộng</th>
                    <th>Phí giao hàng</th>
                    <th>Lợi nhuận ròng</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliates &&
                    affiliates.orderProfitResponses?.map(renderAffiliateRow)}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalPage}
            onChange={handlePageChange}
          />
        </TabPane>
      </Tabs>
      {isOpen && <OrderModal item={selectedOrder} onClose={handleModalClose} />}
    </>
  );
};
