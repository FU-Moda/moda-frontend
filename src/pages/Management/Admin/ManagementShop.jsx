import { useEffect, useState } from "react";
import { getAllShop } from "../../../api/shopApi";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
export const ManagementShop = () => {
  const [listShop, setListShop] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllShop(1, 10);
    if (data.isSuccess) {
      setListShop(data.result.items);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h1 className="text-center text-primary font-bold text-xl uppercase">
        Quản lý đối tác
      </h1>
      <LoadingComponent isLoading={isLoading} />
      <div className="overflow-x-auto mt-4 shadow-lg rounded-md">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tên cửa hàng</th>
              <th>Mô tả</th>
              <th>Địa chỉ</th>
              <th>Tên chủ cửa hàng</th>
              <th>Số điện thoại </th>
            </tr>
          </thead>
          <tbody>
            {listShop &&
              listShop.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/admin/shop/${item.id}`)}
                  className="cursor-pointer"
                >
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.address}</td>
                  <td>{`${item.account.firstName} ${item.account.lastName}`}</td>
                  <td>{`${item.account.phoneNumber}`}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
