import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { getProductByStatus } from "../../../api/productApi";
import ProductTable from "./Product/ProductTable";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
const { TabPane } = Tabs;

const ProductManagementStaff = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async (status) => {
    setIsLoading(true);
    const data = await getProductByStatus(status, 1, 10);
    if (data.isSuccess) {
      if (data.result?.items.length > 0) {
        setProducts(data.result?.items);
      } else {
        setProducts([]);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-primary text-xl uppercase">
        Kiểm duyệt sản phẩm
      </h1>
      <LoadingComponent isLoading={isLoading} />
      <Tabs defaultActiveKey="0" onChange={handleTabChange}>
        <TabPane tab="Chưa kiểm duyệt" key="0" />
        <TabPane tab="Đã duyệt" key="1" />
        <TabPane tab="Từ chối" key="2" />
      </Tabs>
      <ProductTable products={products} fetchData={fetchData} />
    </div>
  );
};

export default ProductManagementStaff;
