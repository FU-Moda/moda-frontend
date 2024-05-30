import React, { useEffect, useState } from "react";
import { Tabs, Table, Button, Popconfirm, message } from "antd";
import { getShopPackageByStatus } from "../../../api/shopApi";
import { formatPrice } from "../../../utils/util";

const { TabPane } = Tabs;
const PackageManagement = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getShopPackageByStatus(1, 10, status);
      if (response.isSuccess) {
        setData(response.result.items);
      }
    };

    fetchData();
  }, [status]);

  const handleConfirm = (record) => {
    message.success(
      `Confirmed package ${record.optionPackageHistory.optionPackage.packageName}`
    );
  };

  const handleDecline = (record) => {
    // Handle decline action here
    message.success(
      `Declined package ${record.optionPackageHistory.optionPackage.packageName}`
    );
  };

  const columns = [
    {
      title: "Tên cửa hàng",
      dataIndex: ["shop", "name"],
      key: "shopName",
    },
    {
      title: "Tên gói dịch vụ",
      dataIndex: ["optionPackageHistory", "optionPackage", "packageName"],
      key: "packageName",
    },
    {
      title: "Giá gói",
      dataIndex: ["optionPackageHistory", "packagePrice"],
      key: "packagePrice",
      render: (text) => <span>{formatPrice(text)}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          <Popconfirm
            title="Are you sure to confirm this package?"
            onConfirm={() => handleConfirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Xác nhận</Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure to decline this package?"
            onConfirm={() => handleDecline(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Huỷ</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-center text-primary font-bold text-2xl uppercase my-4">
        Quản lý gói dịch vụ
      </h1>
      <Tabs
        defaultActiveKey="0"
        onChange={(key) => setStatus(parseInt(key, 10))}
      >
        <TabPane tab="Đợi xác nhận" key="0">
          <Table
            columns={columns}
            dataSource={data.filter((item) => item.shopPackageStatus === 0)}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Thành công" key="1">
          <Table
            columns={columns}
            dataSource={data.filter((item) => item.shopPackageStatus === 1)}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Thất bại" key="2">
          <Table
            columns={columns}
            dataSource={data.filter((item) => item.shopPackageStatus === 2)}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Hoàn lại" key="3">
          <Table
            columns={columns}
            dataSource={data.filter((item) => item.shopPackageStatus === 3)}
            rowKey="id"
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default PackageManagement;
