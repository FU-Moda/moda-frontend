import React, { useEffect, useState } from "react";
import { getRatingByProductId } from "../../api/productApi";

const RatingComponent = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [ratings, setRatings] = useState([]);
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const fetchData = async () => {
    const data = await getRatingByProductId(id, 1, 10);
    console.log(data);
    if (data.isSuccess) {
      setRatings(data.result?.items);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`text-3xl cursor-pointer transition-colors duration-300 ${
              value <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleRatingChange(value)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <textarea
        className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        rows={4}
        placeholder="Nhập đánh giá của bạn..."
        value={comment}
        onChange={handleCommentChange}
      />
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className=" btn bg-primary text-white rounded-md">
            Chọn tệp
          </span>
        </div>
        <input type="file" onChange={handleImageChange} className="hidden" />
      </label>

      {imageFile && (
        <div className="mb-4 w-40 h-40">
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="max-w-full h-full rounded-md shadow-md"
          />
        </div>
      )}
      <button
        className="mt-10 bg-primary text-white px-6 py-3 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={rating === 0 || comment.trim() === ""}
      >
        Gửi đánh giá
      </button>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4">
          Đánh giá từ khách hàng khác
        </h4>
        {ratings &&
          ratings.length > 0 &&
          ratings.map((review, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-md mb-4 shadow-md transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <img
                  src={
                    review.rating?.createByAccount.avatarUrl ||
                    "https://via.placeholder.com/50"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span className="font-semibold">
                  {review.rating?.createByAccount?.firstName}{" "}
                  {review.rating?.createByAccount?.lastName}
                </span>
                {[...Array(review.rating.ratingPoint)].map((_, i) => (
                  <span key={i} className="text-xl text-yellow-500 ml-2">
                    &#9733;
                  </span>
                ))}
              </div>
              <div className="flex mb-2">
                <strong className="mr-2">Sản phẩm:</strong>
                <p className="text-gray-600">
                  {review.rating?.title || "Không có tên sản phẩm"}
                </p>
              </div>
              <div className="flex mb-2">
                <strong className="mr-2">Đánh giá vào lúc:</strong>
                <p className="text-gray-600">
                  {new Date(review.rating?.createDate).toLocaleString()}
                </p>
              </div>
              <div className="flex mb-4">
                <strong className="mr-2">Nội dung:</strong>
                <p className="text-gray-700">{review.rating?.content}</p>
              </div>
              <div className="flex flex-wrap">
                {review.image.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt="Product"
                    className="max-w-full h-auto mr-2 mb-2 rounded-md shadow-md"
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RatingComponent;
