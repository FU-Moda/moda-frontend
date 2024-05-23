import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  getProductReport,
  getRevenueReport,
  getUserReport,
} from "../../../api/dashboardApi";
import { formatPrice } from "../../../utils/util";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import { clothTypeLabels, genderLabels } from "../../../utils/constant";
const ShopDashboard = () => {
  const [dataRevenue, setDataRevenue] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [dataProduct, setDataProduct] = useState([]);

  const [selectedChoice, setSelectedChoice] = useState(0);
  const { shop } = useSelector((state) => state.shop || {});
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    const [responseRevenue, responseUser, responseProduct] = await Promise.all([
      getRevenueReport(selectedChoice, shop.id),
      getUserReport(selectedChoice, shop.id),
      getProductReport(selectedChoice, shop.id),
    ]);
    if (responseRevenue.isSuccess && responseUser.isSuccess) {
      setDataRevenue(responseRevenue.result);
      setDataUser(responseUser.result);
      setDataProduct(responseProduct.result?.productReports);
      console.log(responseUser);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [selectedChoice, shop]);
  const chartData = {
    labels: [
      "Tổng",
      "Số đơn hàng",
      "Giá trị đơn hàng nhỏ nhất",
      "Giá trị đơn hàng lớn nhất",
      "Giá trị đơn hàng trung bình",
    ],
    datasets: [
      {
        data: [
          dataRevenue?.total,
          dataRevenue?.numOfOrder,
          dataRevenue?.minOrderValue,
          dataRevenue?.maxOrderValue,
          dataRevenue?.avarageOrderValue,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2ECC71",
          "#9B59B6",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2ECC71",
          "#9B59B6",
        ],
      },
    ],
  };
  return (
    <>
      <Loader loading={isLoading} />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-green-600">
              Tổng doanh thu
            </h2>
            <p className="text-3xl font-bold text-green-800">
              {formatPrice(dataRevenue?.total)}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-orange-400">
              Số đơn hàng
            </h2>
            <p className="text-3xl font-bold text-orange-800">
              {dataRevenue?.numOfOrder} đơn
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-blue-400">
              Tổng khách hàng
            </h2>
            <p className="text-3xl font-bold text-blue-800">
              {dataUser?.totalCustomer}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-red-400">
              Khách hàng mới
            </h2>
            <p className="text-3xl font-bold text-red-800">
              {dataUser?.newCustomer}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-primary">Thống kê</h2>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Chọn khoảng thời gian</span>
            </label>
            <select
              class="select select-bordered w-full max-w-xs"
              onChange={(e) => setSelectedChoice(Number(e.target.value))}
            >
              <option selected value={0}>
                {" "}
                Tuần này
              </option>
              <option value={1}> Tháng này</option>
              <option value={2}> 6 tháng gần nhất</option>
              <option value={3}> 12 tháng gần nhất</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Loại sản phẩm</th>
                    <th>Giới tính</th>
                    <th>Tổng doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProduct &&
                    dataProduct.length > 0 &&
                    dataProduct.map((report) => (
                      <tr key={report.product.id}>
                        <td>{report.product.name}</td>
                        <td>{report.product.description}</td>
                        <td>{clothTypeLabels[report.product?.clothType]}</td>
                        <td>{genderLabels[report.product?.gender]}</td>
                        <td>{formatPrice(report.total)} </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-1 max-w-md mx-auto">
            <Doughnut data={chartData} width={400} height={300} />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShopDashboard;
