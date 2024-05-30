import { formatPrice } from "../../utils/util";

const CartSummary = ({ totalPrice }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Giỏ hàng</h2>
        <h3 className="text-xl font-bold">
          Tổng tiền: {formatPrice(totalPrice)}
        </h3>
      </div>
    </>
  );
};

export default CartSummary;
