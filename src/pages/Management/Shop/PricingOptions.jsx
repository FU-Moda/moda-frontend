import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import {
  assignPackageForShop,
  getAllOptionPackage,
} from "../../../api/packageApi";
import { formatPrice } from "../../../utils/util";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PricingOption from "../../../components/PricingOption/PricingOption";

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
              isUsed={false}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default PricingOptions;
