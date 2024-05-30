import { useEffect, useState } from "react";
import { Tabs, DatePicker, Pagination } from "antd";
import { useSelector } from "react-redux";
import { getAllOrderByShopId } from "../../../api/orderApi";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import { orderLabels } from "../../../utils/constant";
import OrderModal from "../Shop/Modal/OrderModal";
import {
  getShopAffilateByShopId,
  getTotalAffilate,
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
  const [selectedOrder, setSelectedOrder] = useState({});
  const [affiliates, setAffiliates] = useState([]);
  const [totalAffiliate, setTotalAffiliate] = useState(0);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const fetchData = async (page, size) => {
    setIsLoading(true);
    try {
      const [orderData, affiliateData] = await Promise.all([
        getAllOrderByShopId(shop.id, page, size),
        getShopAffilateByShopId(shop.id, page, size),
      ]);

      if (orderData.isSuccess) {
        setOrders(orderData.result?.items);
        setTotalPage(orderData.result.totalPages);
      }
      if (affiliateData.isSuccess) {
        setAffiliates(affiliateData.result?.items);
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
    const selectedOrder = orders.find((order) => order.order.id === orderId);
    setSelectedOrder(selectedOrder);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const renderOrderRow = (order) => (
    <tr
      key={order.order.id}
      className="cursor-pointer"
      onClick={() => handleExpand(order.order.id)}
    >
      <td>{order.order.id}</td>
      <td>{`${order.order?.account?.firstName} ${order.order?.account?.lastName}`}</td>
      <td>{order.order?.account?.phoneNumber}</td>
      <td>{order.order?.account?.email}</td>

      <td>{new Date(order.order.orderTime).toLocaleString()}</td>
      <td>{orderLabels[order.order?.status]}</td>
      <td>{formatPrice(order.order?.total)}</td>
      <td>{formatPrice(order.order?.deliveryCost)}</td>
      <td>
        <button
          className="btn bg-primary text-white"
          onClick={() => handleExpand(order)}
        >
          Chi tiết
        </button>
      </td>
    </tr>
  );
  const renderAffiliateRow = (affiliate) => (
    <tr
      key={affiliate.id}
      className="cursor-pointer"
      onClick={() => handleExpand(affiliate?.order.id)}
    >
      <td>{affiliate.orderId}</td>
      <td>{`${affiliate.order?.account?.firstName} ${affiliate.order?.account?.lastName}`}</td>
      <td>{affiliate.order?.account?.phoneNumber}</td>
      <td>{affiliate.order?.account?.email}</td>
      <td>{orderLabels[affiliate.order?.status]}</td>
      <td>{new Date(affiliate.orderDate).toLocaleString()}</td>
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
      if (response.isSuccess) {
        setTotalAffiliate(response.result);
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
  useEffect(() => {
    fetchData(currentPage, pageSize);
    handleDateChange([
      moment().utcOffset(420).subtract(1, "months").toDate(),
      moment().utcOffset(420).toDate(),
    ]);
  }, [shop]);
  return (
    <>
      <Tabs defaultActiveKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Quản lí đơn hàng" key="1">
          <LoadingComponent isLoading={isLoading} />
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
                    <th>Ngày đặt hàng</th>
                    <th>Trạng thái</th>
                    <th>Tổng cộng</th>
                    <th>Phí giao hàng</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>{orders && orders.map(renderOrderRow)}</tbody>
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
                  {affiliates && affiliates.map(renderAffiliateRow)}
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
