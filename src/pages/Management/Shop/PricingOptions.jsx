import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import {
  assignPackageForShop,
  getAllOptionPackage,
} from "../../../api/packageApi";
import { formatPrice } from "../../../utils/util";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PricingOption = ({
  title,
  description,
  price,
  status,
  isDashboardAvailable,
  isBannerAvailable,
  onSelectPackage,
}) => {
  const cardClasses = `card shadow-xl bg-white p-6 rounded-lg`;
  const statusText = status === 1 ? "Đang hoạt động" : "Ngừng hoạt động";
  const dashboardText = isDashboardAvailable
    ? "Có thể sử dụng dashboard"
    : "Không thể sử dụng dashboard";
  const bannerText = isBannerAvailable
    ? "Có thể sử dụng banner quảng cáo tại MODA"
    : "Không thể sử dụng banner";

  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="mt-4">
        <div className="flex items-center mb-2">
          <span className="text-green-500 font-bold mr-2">
            {price === 0 ? "Miễn phí" : `${price}`}
          </span>
          <span className="text-gray-500">{statusText}</span>
        </div>
        <div className="flex items-start">
          <span className="text-gray-500 font-semibold mr-2">Dashboard:</span>
          <span className="text-gray-600">{dashboardText}</span>
        </div>
        <div className="flex items-start mt-2">
          <span className="text-gray-500 font-semibold mr-2">Banner:</span>
          <span className="text-gray-600">{bannerText}</span>
        </div>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onSelectPackage}
      >
        Chọn gói này
      </button>
    </div>
  );
};

const PricingOptions = ({ isModalVisible, setIsModalVisible }) => {
  const [options, setOptions] = useState([]);
  const shop = useSelector((state) => state.shop.shop || {});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchOptions = async () => {
    const data = await getAllOptionPackage(1, 10);
    if (data.isSuccess) {
      setOptions(data.result.items);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleSelectPackage = async (optionPackageId) => {
    try {
      const data = await assignPackageForShop(shop?.id, optionPackageId);
      if (data.isSuccess) {
        toast.success(
          "Gói đã được đăng kí thành công! Vui lòng đợi nhân viên xác nhận."
        );
      }
    } catch (error) {
      toast.error("Failed to assign package.");
      console.error(error);
    }
  };

  return (
    <div className="">
      <Button type="primary" onClick={showModal}>
        Gói dịch vụ MODA
      </Button>
      <Modal
        title="Gói dich vụ tại MODA"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        <div className="flex justify-center gap-8 my-8">
          {options.map((option, index) => (
            <PricingOption
              key={index}
              title={option.optionPackage.packageName}
              description={option.optionPackage.description}
              price={formatPrice(option.optionPackageHistory[0].packagePrice)}
              isBannerAvailable={option.optionPackage.isBannerAvailable}
              isDashboardAvailable={option.optionPackage.isDashboardAvailable}
              status={option.optionPackage.status}
              onSelectPackage={() =>
                handleSelectPackage(option.optionPackage?.optionPackageId)
              }
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default PricingOptions;
