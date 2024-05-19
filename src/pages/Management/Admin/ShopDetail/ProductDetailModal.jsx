import RatingComponent from "../../../../components/Rating/RatingComponent";
import {
  clothTypeLabels,
  clothingSizeLabels,
  genderLabels,
  shoeSizeLabels,
} from "../../../../utils/constant";

const RatingCard = ({ rating }) => {
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title text-xl font-bold mb-2">{rating.title}</h2>
        <div className="rating rating-lg mb-2">
          {Array(rating.ratingPoint)
            .fill()
            .map((_, index) => (
              <span key={index} className="text-xl text-yellow-500 ml-2">
                &#9733;
              </span>
            ))}
        </div>
        <p className="mb-2">{rating.content}</p>
        <div className="flex justify-end">
          <div className="badge badge-outline mr-2">
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
  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box relative max-w-6xl">
          <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-4 text-primary">
                Thông tin sản phẩm
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Tên sản phẩm:</span>
                    <span>{product.product.name}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Mô tả:</span>
                    <span>{product.product.description}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Loại:</span>
                    <span>{clothTypeLabels[product.product.clothType]}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">Giới tính:</span>
                    <span>{genderLabels[product.product.gender]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p></p>
          <table class="w-full mb-4 bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-primary text-white">
              <tr>
                <th class="px-4 py-2">STT</th>
                <th class="px-4 py-2">Kích cỡ</th>
                <th class="px-4 py-2">Số lượng</th>
                <th class="px-4 py-2">Giá</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {product.productStock.map((stock, index) => (
                <tr key={stock.id}>
                  <td class="text-center px-4 py-2">{index + 1}</td>
                  <td class="text-center px-4 py-2">
                    {stock.shoeSize
                      ? shoeSizeLabels[stock.shoeSize]
                      : clothingSizeLabels[stock.clothingSize]}
                  </td>
                  <td class="text-center px-4 py-2">{stock.quantity}</td>
                  <td class="text-center px-4 py-2">
                    {stock.price.toLocaleString()} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <p className="font-semibold mx-8  text-xl mb-4 text-primary">
              Feedback của khách hàng
            </p>
            <div className="grid grid-cols-1 gap-4">
              {ratings &&
                ratings.map((item) => (
                  <RatingCard key={item.rating.id} rating={item.rating} />
                ))}
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
