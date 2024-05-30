import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from "antd";
import {
  deleteOptionPackage,
  updateOptionPackage,
} from "../../../../api/packageApi";
import { useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
const PackageModal = ({ visible, setVisible, item }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        packagePrice: item?.optionPackageHistory?.[0]?.packagePrice,
        optionPackageDto: {
          packageName: item?.optionPackage?.packageName,
          duration: moment(item?.optionPackage?.duration),
          description: item?.optionPackage?.description,
          status: item?.optionPackage?.status,
          priority: item?.optionPackage?.priority,
          isDashboardAvailable: item?.optionPackage?.isDashboardAvailable,
          isBannerAvailable: item?.optionPackage?.isBannerAvailable,
        },
      });
    }
  }, [item, form]);
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
    const response = await updateOptionPackage(
      item?.optionPackage?.optionPackageId,
      data
    );
    if (response.isSuccess) {
      toast.success("Cập nhật gói thành công");
      setVisible(false);
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();

    if (item?.optionPackage?.optionPackageId) {
      Modal.confirm({
        title: "Bạn có chắc chắn muốn xoá gói này?",
        content: "Thao tác này không thể hoàn tác.",
        okText: "Xoá",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          try {
            console.log("Delete package", item?.optionPackage?.optionPackageId);
            const response = await deleteOptionPackage(
              item?.optionPackage?.optionPackageId
            );
            console.log(response);
            if (response.isSuccess) {
              toast.success("Xoá gói thành công");
              setVisible(false);
            } else {
              toast.error("Có lỗi xảy ra khi xoá gói");
            }
          } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi gọi API");
          }
        },
      });
    }
  };
  return (
    <div>
      <Modal
        title="Chỉnh sửa gói"
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          name="update_package"
          onFinish={onFinish}
          layout="vertical"
          className="mx-auto"
          style={{ maxWidth: "500px", maxHeight: "600px", overflow: "auto" }}
        >
          <Form.Item
            name={["optionPackageDto", "packageName"]}
            label="Tên gói"
            rules={[
              { required: true, message: "Tên gói không được để trống!" },
            ]}
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
            rules={[
              { required: true, message: "Priority không được để trống!" },
            ]}
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
          <Form.Item>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
              onClick={handleDelete}
            >
              Xoá gói
            </button>
          </Form.Item>
        </Form>{" "}
      </Modal>
    </div>
  );
};

export default PackageModal;
