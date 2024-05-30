import React, { useState } from "react";
import { formatDate } from "../../utils/util";
import SettingModal from "../../pages/Management/Admin/Setting/SettingModal";
import moment from "moment";

const CommissionRates = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if (data.length < 0) {
    return <div className="text-center">Không có dữ liệu</div>;
  }
  console.log("data", selectedItem);
  return (
    <div className="container mx-auto py-4">
      {selectedItem && (
        <SettingModal
          visible={isModalOpen}
          onCancel={handleCloseModal}
          initialValues={selectedItem}
        />
      )}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tên cấu hình</th>
              <th>Giá trị hiện tại</th>
              <th>Giá trị được kích hoạt</th>
              <th>Ngày kích hoạt</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <tr
                  key={item.id}
                  className="hover"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="font-bold">{item.name}</td>
                  <td>{item.preValue}</td>
                  <td>{item.activeValue}</td>
                  <td>{formatDate(item.activeDate)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionRates;
