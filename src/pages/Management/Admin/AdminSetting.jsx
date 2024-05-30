import { useEffect } from "react";
import { getAllConfiguration } from "../../../api/configurationApi";
import CommissionRates from "../../../components/CommissionRates/CommissionRates";
import { useState } from "react";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import SettingModal from "./Setting/SettingModal";
const AdminSetting = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getAllConfiguration(1, 100);
    if (response.isSuccess) {
      setData(response.result.items);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <LoadingComponent isLoading={isLoading} />
      <h1 className="text-center text-primary text-2xl font-bold my-2">
        Cấu hình hệ thống
      </h1>
      <CommissionRates data={data} />
      {/* The SettingModal component */}
    </div>
  );
};
export default AdminSetting;
