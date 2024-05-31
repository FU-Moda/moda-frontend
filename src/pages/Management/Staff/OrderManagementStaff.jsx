import { useEffect, useState } from "react";
import { getAllOrder } from "../../../api/orderApi";

const OrderManagementStaff = () => {
    const [orderList, setOrderList] = useState([]);
    const fetchData = async () => {
        const data = await getAllOrder(1, 10);
        if (data.isSuccess) {
            setOrderList(data.result.items);
        }
    }
useEffect(() => {
fetchData();
},[]);


  return (
    <div>
      <h1 className="text-center text-primary font-bold text-2xl uppercase my-4">
        Kiểm duyệt đơn hàng</h1>
       
    </div>
  );
}
export default OrderManagementStaff;