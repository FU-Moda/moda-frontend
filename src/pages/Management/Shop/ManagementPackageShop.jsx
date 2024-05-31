import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PricingOption from "../../../components/PricingOption/PricingOption";
import { formatPrice } from "../../../utils/util";
import { checkShopPackageSubscription } from "../../../api/shopApi";

const ManagementPackageShop = () => {

const shop = useSelector((state) => state.shop.shop|| {});
const [packages, setPackages] = useState({});

const fetchPackages = async () => {
    const data = await checkShopPackageSubscription(shop.id);
    if (data.isSuccess) {
      setPackages(data.result);
    }
  };
  useEffect(() => {
    fetchPackages();
  }, []);
  return (
    <div className="grid grid-cols-1">
      <h1 className="text-center text-primary text-xl font-bold">Quản lý gói dịch vụ</h1>
      <PricingOption
          title={packages.packageName}
          description={packages.description}
          price={formatPrice(packages.packagePrice)}
          isBannerAvailable={packages.isBannerAvailable}
          isDashboardAvailable={packages.isDashboardAvailable}
          status={packages.status}
          isUsed={true}
        />
    </div>
  );
}
export default ManagementPackageShop;