import React from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { updateConfiguration } from "../../../../api/configurationApi";
import { toast } from "react-toastify";

const SettingModal = ({ visible, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  console.log("initialValues", initialValues);

  React.useEffect(() => {
    if (
      initialValues &&
      initialValues.activeDate &&
      moment(initialValues.activeDate)
    ) {
      form.setFieldsValue({
        name: initialValues.name,
        preValue: initialValues.preValue,
        activeValue: initialValues.activeValue,
        activeDate: moment(initialValues.activeDate),
      });
    }
  }, [form, initialValues]);
  const handleOk = async () => {
    const values = form.getFieldsValue();
    values.activeDate = new Date(values.activeDate).toISOString();
    console.log("values", values);
    const response = await updateConfiguration(values);
    if (response.isSuccess) {
      toast.success("Câp nhật thành công");
    } else {
      toast.error("Cập nhật thất bại");
    }
    onCancel();
  };
  return (
    <Modal
      visible={visible}
      title="Cấu hình hệ thống"
      okText="OK"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên cấu hình"
          rules={[
            {
              type: "string",
              required: true,
              message: "Tên cấu hình không được để trống!",
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="preValue"
          label="Giá trị hiện tại"
          rules={[
            {
              type: "string",
              required: true,
              message: "Giá trị hiện tại không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="activeValue"
          label="Giá trị kích hoạt"
          rules={[
            {
              type: "string",
              required: true,
              message: "Giá trị kích hoạt không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="activeDate"
          label="Ngày kích hoạt"
          rules={[
            {
              type: "date",
              required: true,
              message: "Ngày kích hoạt không được để trống!",
            },
          ]}
        >
          <DatePicker showTime format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SettingModal;
