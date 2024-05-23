import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getRevenueReport } from "../../../api/dashboardApi";
import { formatPrice } from "../../../utils/util";

const data = {
  result: {
    total: 382332000,
    numOfOrder: 129,
    minOrderValue: 406000,
    maxOrderValue: 41980000,
    avarageOrderValue: 2963813.9534883723,
  },
  isSuccess: true,
  messages: [],
};
export const AdminDashboard = () => {
  const [dataRevenue, setDataRevenue] = useState({});
  const [selectedChoice, setSelectedChoice] = useState(0);
  const fetchData = async () => {
    const response = await getRevenueReport(selectedChoice);
    if (response.isSuccess) {
      setDataRevenue(response.result);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedChoice]);
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
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-green-600">
              Tổng doanh thu
            </h2>
            <p className="text-3xl font-bold text-green-800">
              {formatPrice(dataRevenue.total)}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-orange-400">
              Số đơn hàng
            </h2>
            <p className="text-3xl font-bold text-orange-800">
              {dataRevenue.numOfOrder} đơn
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
        <div className="grid grid-cols-3">
          <div className="col-span-1 max-w-md mx-auto">
            <Doughnut data={chartData} width={400} height={300} />
          </div>
        </div>
      </div>
    </>
  );
};
