import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllOrderByAccountId,
  getAllOrderDetailsByOrderId,
} from "../../api/orderApi";
import { orderLabels } from "../../utils/constant";
import { formatDateTime, formatPrice } from "../../utils/util";
import { clothingSizeLabels, shoeSizeLabels } from "../../utils/constant";
import PersonalModal from "./Account/PersonalModal";
import PricingOptions from "../Management/Shop/PricingOptions";
import { checkShopPackageSubscription } from "../../api/shopApi";
import PricingOption from "../../components/PricingOption/PricingOption";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const PersonalInformation = () => {
  const { user } = useSelector((state) => state.user || {});
  const { role } = useSelector((state) => state.user || {});
  const shop = useSelector((state) => state.shop.shop || {});
  const [orders, setOrders] = useState([]);
  const [isOrderDetail, setIsOrderDetail] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [packages, setPackages] = useState({});
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userMap = {
    name: `${user.firstName} ${user.lastName}`,
    email: `${user.email}`,
    phone: `${user.phoneNumber}`,
    address: `${user.address}`,
  };
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await getAllOrderByAccountId(user.id, 1, 100);
      if (data.isSuccess) {
        setOrders(data.result.items);
        console.log(data.result.items);
      }
    } catch (error) {
      message.error("An error occurred while fetching orders");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const data = await checkShopPackageSubscription(shop.id);
      if (data.isSuccess) {
        setPackages(data.result);
      }
    } catch (error) {
      message.error("An error occurred while fetching orders");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
    fetchPackages();
  }, [user]);
  const fetchOrderDetails = async (id) => {
    try {
      setIsLoading(true);
      const data = await getAllOrderDetailsByOrderId(id, 1, 100);
      if (data.isSuccess) {
        setData(data.result);
      }
    } catch (error) {
      message.error("An error occurred while fetching order details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (item) => {
    setIsOrderDetail(true);
    fetchOrderDetails(item.id);
  };
  const renderOrderItems = (item) => {
    return (
      <tr
        key={item.id}
        className="cursor-pointer"
        onClick={() => handleClick(item)}
      >
        <td>{item.id}</td>
        <td>{item.address}</td>
        <td>{orderLabels[item.status]}</td>
        <td>{formatPrice(item.total)}</td>
        <td>{formatPrice(item.deliveryCost)}</td>
        <td>{formatDateTime(item.orderTime)}</td>
      </tr>
    );
  };
  console.log("shop", shop);
  return (
    <div className="container mx-auto py-8">
      <LoadingComponent isLoading={isLoading} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 bg-white shadow-md rounded-box p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4 text-primary">
              Thông tin người dùng
            </h2>
            <span
              onClick={() => setIsUpdateModalOpen(true)}
              className="cursor-pointer"
            >
              <i className="fa-solid fa-pen text-primary"></i>
            </span>
          </div>

          <div style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
            <p>
              <strong>Tên:</strong> {userMap.name}
            </p>
            <p>
              <strong>Email:</strong> {userMap.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {userMap.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {userMap.address}
            </p>
          </div>
        </div>
        {!isOrderDetail ? (
          <>
            <div className="col-span-3 bg-white shadow-lg rounded-box p-6">
              <h2 className="text-xl font-bold mb-4 text-primary text-center">
                Đơn hàng
              </h2>
              {orders.length === 0 ? (
                <p>Bạn chưa có đơn hàng nào.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Mã đơn hàng</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                        <th>Phí giao hàng</th>
                        <th>Thời gian đặt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.length > 0 &&
                        orders.map((order) => renderOrderItems(order))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="col-span-3 gap-4 shadow-xl rounded-lg p-4">
              <span
                onClick={() => setIsOrderDetail(!isOrderDetail)}
                className="text-primary cursor-pointer"
              >
                Back
              </span>
              <div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-primary text-center">
                    Thông tin đơn hàng
                  </h3>

                  <p>
                    <strong>Mã đơn hàng:</strong> {data.order?.id}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {data.order?.address}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {data.order?.phoneNumber}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    {orderLabels[data.order?.status]}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong> {formatPrice(data.order?.total)}
                  </p>
                  <p>
                    <strong>Phí giao hàng:</strong>{" "}
                    {formatPrice(data.order?.deliveryCost)}
                  </p>
                  <p>
                    <strong>Thời gian đặt hàng:</strong>{" "}
                    {formatDateTime(data.order?.orderTime)}
                  </p>
                </div>
              </div>
              <div>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Size</th>
                      <th>Đơn giá</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orderDetails &&
                      data.orderDetails.length > 0 &&
                      data.orderDetails.map((orderDetail) => (
                        <tr key={orderDetail.id}>
                          <td>{orderDetail.productStock.product.name}</td>
                          <td>{orderDetail.quantity}</td>
                          <td>
                            {orderDetail.productStock.clothingSize !== null
                              ? `${
                                  clothingSizeLabels[
                                    orderDetail.productStock.clothingSize
                                  ]
                                }`
                              : `${
                                  shoeSizeLabels[
                                    orderDetail.productStock.shoeSize
                                  ]
                                }`}
                          </td>
                          <td>
                            {formatPrice(orderDetail.productStock?.price)}
                          </td>
                          <td>
                            {formatPrice(
                              orderDetail.quantity *
                                orderDetail.productStock.price
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {isUpdateModalOpen && (
          <PersonalModal
            onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
          />
        )}
      </div>
      {role === "isShop" && (
        <div className="grid grid-cols-1 mt-8">
          <h1 className=" text-primary text-xl font-bold">
            {" "}
            Gói dịch vụ đã đăng kí tại MODA
          </h1>
          <div>
            {shop.id && !packages.optionPackageId && (
              <PricingOptions
                isModalVisible={isPricingOpen}
                setIsModalVisible={() => setIsPricingOpen(!isPricingOpen)}
              />
            )}
          </div>
          <PricingOption
            title={packages.packageName}
            description={packages.description}
            price={formatPrice(packages.packagePrice)}
            isBannerAvailable={packages.isBannerAvailable}
            isDashboardAvailable={packages.isDashboardAvailable}
            status={packages.status}
            isUsed={true}
          />
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;
