import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductByShopId } from "../../../api/productApi";
import { TableProduct } from "../../../components/management-components/TableProduct/TableProduct";
import Loader from "../../../components/Loader/Loader";
import { NavLink } from "react-router-dom";
const ManagementProduct = () => {
  const { shop } = useSelector((state) => state.shop || {});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getProductByShopId(shop.id, 1, 10);
    if (data.isSuccess) {
      setIsLoading(false);
      setProducts(data.result?.items);
    }
  };
  console.log(isLoading);
  useEffect(() => {
    fetchData();
  }, [shop]);
  return (
    <>
      <Loader isLoading={isLoading} />
      <h1 className="text-center text-2xl font-semibold uppercase text-primary">
        Quản lý sản phẩm
      </h1>
      <div className="flex justify-end">
        <NavLink
          className={"bg-primary block  text-white px-4 py-2 rounded-md"}
          to={`create`}
        >
          Tạo mới
        </NavLink>
      </div>
      {!isLoading && <TableProduct products={products} />}
    </>
  );
};
export default ManagementProduct;
