import { Steps, Modal, Button } from 'antd';
import { useState } from 'react';

const { Step } = Steps;

const PurchaseSteps = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button className='bg-slate-400 text-white' shape="circle" onClick={showModal}>
        ?
      </Button>
      <Modal
        title="Hướng dẫn mua hàng"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Steps direction="vertical">
          <Step title="Bước 1" description="Chọn món hàng bạn muốn mua." />
          <Step title="Bước 2" description="Thêm vào giỏ hàng với số lượng phù hợp với túi tiền của bạn." />
          <Step title="Bước 3" description="Bấm đặt hàng." />
          <Step title="Bước 4" description="Thanh toán." />
          <Step title="Bước 5" description="Đợi MODA xác nhận giao dịch và gửi đơn cho shop." />
        </Steps>
      </Modal>
    </>
  );
};

export default PurchaseSteps;