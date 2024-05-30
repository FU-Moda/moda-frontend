import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon } from "../../redux/features/cartSlice";

const CouponList = ({ items }) => {
  const dispatch = useDispatch();
  const selectedCoupon = useSelector(
    (state) => state.cart.selectedCoupon || ""
  );
  console.log(selectedCoupon);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items &&
        items.length > 0 &&
        items.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-lg overflow-hidden cursor-pointer relative  shadow-lg my-2"
            onClick={() => dispatch(applyCoupon(coupon.code))}
          >
            {selectedCoupon === coupon.code && (
              <div className="absolute top-0 right-0  bg-green-600 text-white px-2 py-1 rounded-bl-lg shadow-lg">
                Áp dụng
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-green-600">
                Mã Khuyến Mãi: {coupon.code}
              </h3>
              <p className="text-gray-600">
                Ngày bắt đầu:
                <span className="mx-2">
                  {" "}
                  {new Date(coupon.startDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-gray-600">
                Ngày kết thúc:
                <span className="mx-2">
                  {" "}
                  {new Date(coupon.endDate).toLocaleDateString()}
                </span>
              </p>
              {coupon.percent ? (
                <p className="text-green-600 font-semibold">
                  Giảm {coupon.percent}%
                </p>
              ) : (
                <p className="text-green-600 font-semibold">
                  Giảm {coupon.conditionAmount.toLocaleString()} đồng
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CouponList;
