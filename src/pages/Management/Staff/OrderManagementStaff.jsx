import { useEffect, useState } from "react";
import { Table, Button, Tabs, message } from "antd";
import { getAllOrderByStatus, updateOrderStatus } from "../../../api/orderApi";
const { TabPane } = Tabs;

const OrderManagementStaff = () => {
  const [orderList, setOrderList] = useState([]);
  const [status, setStatus] = useState(0);
  const fetchData = async () => {
    const data = await getAllOrderByStatus(status, 1, 10);
    if (data.isSuccess) {
      setOrderList(data.result.items);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status]);

  const handleTabChange = (key) => {
    setStatus(parseInt(key));
  };
  const handleupdateOrderStatus = async (orderId) => {
    const response = await updateOrderStatus(orderId);
    if (response.isSuccess) {
      message.success("Order status updated successfully");
      fetchData();
    } else {
      message.error("Failed to update order status");
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Phí giao hàng",
      dataIndex: "deliveryCost",
      key: "deliveryCost",
    },
    {
      title: "Thời gian đặt hàng",
      dataIndex: "orderTime",
      key: "orderTime",
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <div>
          {record.status === 0 && (
            <Button
              type="primary"
              onClick={() => handleupdateOrderStatus(record.id)}
            >
              Confirm
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center text-primary font-bold text-2xl uppercase my-4">
        Kiểm duyệt đơn hàng
      </h1>
      <Tabs defaultActiveKey="0" onChange={handleTabChange}>
        <TabPane tab="Đang chờ xác nhận" key="0" />
        <TabPane tab="Chuyển cho Shop" key="1" />
        <TabPane tab="Chuyển cho Giao hàng" key="2" />
      </Tabs>
      <Table columns={columns} dataSource={orderList} rowKey="id" />
    </div>
  );
};

export default OrderManagementStaff;
