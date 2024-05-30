import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/util";

const CartSummary = ({ totalPrice }) => {
  const selectedCoupon = useSelector(
    (state) => state.cart.selectedCoupon || {}
  );
  return (
    <div className="shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4 p-4">
        <h2 className="text-xl font-bold">Giỏ hàng</h2>
        <h3 className="text-xl font-bold">{formatPrice(totalPrice)}</h3>
      </div>
      <div className="flex justify-between items-center mb-4 p-4">
        <h2 className="text-xl font-bold"> Giảm giá:</h2>
        <h3 className="text-xl font-bold">
          {selectedCoupon.percent ? `${selectedCoupon.percent}%` : "0%"}
        </h3>
      </div>
      <div className="flex justify-between items-center mb-4 p-4">
        <h2 className="text-xl font-bold"> Tổng tiền:</h2>
        <h3 className="text-xl font-bold text-red-500">
          {formatPrice(
            (totalPrice * (100 - (selectedCoupon.percent || 0))) / 100
          )}
        </h3>
      </div>
    </div>
  );
};

export default CartSummary;
