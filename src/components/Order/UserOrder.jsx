import React, { useEffect, useState } from 'react';
import { getAllOrderByAccountId } from '../../api/orderApi';
import { updateOrderStatus } from '../../api/orderApi';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserOrder = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const [orderData] = await Promise.all([
      getAllOrderByAccountId(id, 1, 10)
    ]);
    if (orderData.isSuccess) {
      setOrders(orderData.result?.items);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }
    , [id]);
  console.log(orders)
  const handleCompleteOrder = async (orderId, status) => {
    // Replace with your API endpoint for completing the order
    const updateData= await updateOrderStatus(orderId, status);
      if(updateData.isSuccess){
        toast.success("Cập nhật trạng thái thành công!");
        fetchData();
      } else {
        updateData.messages.foreach((item)=>{
          toast.error(item)

        })
      }
      
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Order List</h1>
      <ul className="space-y-4">
        {orders && orders.length > 0 && orders.map((order) => (

          <li key={order.id} className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <div className="font-semibold">Order ID: {order.order?.id}</div>
              <div className="text-gray-600">Status: {order.order?.status}</div>
            </div>
            <div className="space-x-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => handleCompleteOrder(order.order?.id, 3)}
              >
                Complete Order
              </button>
              {order.status === 3 && (
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                  onClick={() => handleRequestRefund(order.order?.id, 4)}
                >
                  Request Refund
                </button>
              )}
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => handleCancelOrder(order.order?.id, 5)}
              >
                Cancel Order
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrder;
