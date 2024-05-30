import React from "react";
import { Form, Input, InputNumber, DatePicker, Switch, Select } from "antd";
import { toast } from "react-toastify";
import { createOptionPackage } from "../../../../api/packageApi";

const CreatePackage = () => {
  const onFinish = async (values) => {
    console.log("Received values from form: ", values);
    const data = {
      packagePrice: values.packagePrice,
      optionPackageDto: {
        packageName: values.optionPackageDto.packageName,
        duration: new Date(values.optionPackageDto.duration).toISOString(),
        description: values.optionPackageDto.description,
        status: values.optionPackageDto.status,
        priority: values.optionPackageDto.priority,
        isDashboardAvailable: values.optionPackageDto.isDashboardAvailable,
        isBannerAvailable: values.optionPackageDto.isBannerAvailable,
      },
    };
    console.log("Transformed data:", data);
    const response = await createOptionPackage(data);
    if (response.isSuccess) {
      toast.success("Tạo gói thành công");
    }
  };

  return (
    <div className="container my-5">
      <h2 className=" mb-4 font-bold text-xl text-center text-primary">
        Tạo gói marketing
      </h2>
      <Form
        name="create_package"
        onFinish={onFinish}
        layout="vertical"
        className="mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <Form.Item
          name={["optionPackageDto", "packageName"]}
          label="Tên gói"
          rules={[{ required: true, message: "Tên gói không được để trống!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="packagePrice"
          label="Giá gói"
          rules={[
            { required: true, message: "Mức giá gói không được để trống !" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name={["optionPackageDto", "duration"]}
          label="Thời gian gói"
          style={{ display: "flex" }}
          rules={[
            { required: true, message: "Thời hạn gói không được để trống!" },
          ]}
        >
          <DatePicker showTime style={{ flex: 1 }} />
        </Form.Item>
        <Form.Item
          name={["optionPackageDto", "description"]}
          label="Mô tả gói"
          rules={[
            { required: true, message: " Mô tả gói không được để trống!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name={["optionPackageDto", "priority"]}
          label="Độ ưu tiên"
          rules={[{ required: true, message: "Priority không được để trống!" }]}
        >
          <Select placeholder="Chọn độ ưu tiên">
            <Select.Option value={0}>Không</Select.Option>
            <Select.Option value={1}>Quan trọng</Select.Option>
            <Select.Option value={2}>Rất quan trọng</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={["optionPackageDto", "status"]}
          label="Status"
          rules={[{ required: true, message: "Status không được để trống!" }]}
        >
          <Select placeholder="Trạng thái">
            <Select.Option value={0}>Vô hiệu hoá</Select.Option>
            <Select.Option value={1}>Hoạt động</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={["optionPackageDto", "isDashboardAvailable"]}
          label="Có dashboard không?"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name={["optionPackageDto", "isBannerAvailable"]}
          label="Có quảng cáo banner không?"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item className="text-center">
          <button
            className="bg-primary px-4 py-2 rounded-md shadow-md text-white "
            htmlType="submit"
          >
            Tạo gói
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePackage;
