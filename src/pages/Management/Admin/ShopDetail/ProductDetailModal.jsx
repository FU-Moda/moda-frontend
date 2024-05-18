import RatingComponent from "../../../../components/Rating/RatingComponent";
import { clothingSizeLabels, shoeSizeLabels } from "../../../../utils/constant";

const RatingCard = ({ rating }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className=" font-bold">{rating.title}</h2>
        <div className="rating rating-lg">
          {Array(rating.ratingPoint)
            .fill()
            .map((_, index) => (
              <span key={index} className="text-xl text-yellow-500 ml-2">
                &#9733;
              </span>
            ))}
        </div>
        <p>{rating.content}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">
            {rating.createByAccount.firstName} {rating.createByAccount.lastName}
          </div>
          <div className="badge badge-outline">
            {new Date(rating.createDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
export const ProductDetailModal = ({ product, ratings, onClose }) => {
  console.log(ratings);
  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box relative max-w-6xl">
          <h3 className=" text-primary text-2xl font-bold text-center uppercase ">
            {product.product.name}
          </h3>
          <table className="table table-compact w-full mt-4">
            <thead>
              <tr>
                <th>STT</th>
                <th>Kích cỡ</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {product.productStock.map((stock, index) => (
                <tr key={stock.id}>
                  <td>{index + 1}</td>
                  <td>
                    {stock.shoeSize
                      ? shoeSizeLabels[stock.shoeSize]
                      : clothingSizeLabels[stock.clothingSize]}
                  </td>
                  <td>{stock.quantity}</td>
                  <td>{stock.price.toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid grid-cols-1 gap-4">
            <p className=" font-bold uppercase text-center text-xl my-4 text-primary">
              Feedback của khách hàng
            </p>
            {ratings &&
              ratings.map((item) => (
                <RatingCard key={item.rating.id} rating={item.rating} />
              ))}
          </div>
          <div className="modal-action">
            <button
              className=" bg-primary bor px-4 py-2 rounded-md text-white cursor-pointer"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
