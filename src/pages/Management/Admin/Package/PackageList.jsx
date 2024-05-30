import React, { useEffect, useState } from "react";
import { Card, Descriptions, List, Typography } from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { getAllOptionPackage } from "../../../../api/packageApi";
import PackageModal from "./PackageModal";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
const { Title, Text } = Typography;

const Badge = ({ color, text }) => (
  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${color}`}>
    {text}
  </span>
);

const PackageList = () => {
  const [packageList, setPackageList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchPackageList = async () => {
    setIsLoading(true);
    const response = await getAllOptionPackage(1, 10);
    if (response.isSuccess) {
      setPackageList(response.result.items);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPackageList();
  }, [isModalVisible]);
  return (
    <div className="container mx-auto py-8">
      <LoadingComponent isLoading={isLoading} />
      <div>
        <div>
          <h1 className="text-2xl font-bold text-primary text-center mb-8 uppercase">
            Danh sách gói marketing tại MODA
          </h1>
          <NavLink
            to="create"
            className="  px-4 py-2 bg-primary text-white rounded-md shadow-md my-2"
          >
            Tạo gói
          </NavLink>
        </div>
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packageList.length > 0 &&
            packageList.map((item) => (
              <Card
                key={item.optionPackage.optionPackageId}
                className="shadow-md"
                onClick={() => {
                  setIsModalVisible(true);
                  setSelectedPackage(item);
                }}
              >
                <div className="mb-4">
                  <Title level={4} className="text-center uppercase">
                    {item.optionPackage.packageName}
                  </Title>
                  <Text type="secondary">{item.optionPackage.description}</Text>
                </div>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Thời hạn">
                    {moment(item.optionPackage.duration).format("DD/MM/YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    <Badge
                      color={
                        item.optionPackage.status === 1
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }
                      text={
                        item.optionPackage.status === 1
                          ? "Đang hoạt động"
                          : "Ngừng hoạt động"
                      }
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Dashboard">
                    <Badge
                      color={
                        item.optionPackage.isDashboardAvailable
                          ? "bg-blue-500 text-white"
                          : "bg-gray-400 text-white"
                      }
                      text={
                        item.optionPackage.isDashboardAvailable ? "Có" : "Không"
                      }
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Banner">
                    <Badge
                      color={
                        item.optionPackage.isBannerAvailable
                          ? "bg-blue-500 text-white"
                          : "bg-gray-400 text-white"
                      }
                      text={
                        item.optionPackage.isBannerAvailable ? "Có" : "Không"
                      }
                    />
                  </Descriptions.Item>
                </Descriptions>
                <div className="mt-4">
                  <Title level={5}>Lịch sử giá</Title>
                  <List
                    dataSource={item.optionPackageHistory}
                    renderItem={(history) => (
                      <List.Item>
                        <div className="flex justify-between">
                          <Text>
                            {moment(history.date).format("DD/MM/YYYY")}
                          </Text>
                          <Text className="mx-4">
                            {history.packagePrice.toLocaleString()} đ
                          </Text>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </Card>
            ))}
        </div>
      </div>
      <PackageModal
        item={selectedPackage}
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </div>
  );
};

export default PackageList;
