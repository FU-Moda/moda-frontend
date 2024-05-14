import React, { useState } from "react";

const RatingComponent = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const fakeReviews = [
    {
      rating: 5,
      comment:
        "Sản phẩm tuyệt vời, chất lượng rất tốt. Tôi rất hài lòng với đơn hàng này.",
      user: "Nguyễn Văn A",
    },
    {
      rating: 4,
      comment:
        "Giao hàng nhanh chóng, đóng gói cẩn thận. Tuy nhiên, kích thước hơi nhỏ so với mong đợi.",
      user: "Trần Thị B",
    },
    {
      rating: 3,
      comment:
        "Sản phẩm tương đối ổn, nhưng có một số điểm cần cải thiện về chất lượng.",
      user: "Lê Văn C",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Đánh giá sản phẩm</h3>
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`text-2xl cursor-pointer ${
              value <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleRatingChange(value)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 mb-2"
        rows={4}
        placeholder="Nhập đánh giá của bạn..."
        value={comment}
        onChange={handleCommentChange}
      />
      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-mainColor transition-colors duration-300"
        disabled={rating === 0 || comment.trim() === ""}
      >
        Gửi đánh giá
      </button>

      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">
          Đánh giá từ khách hàng khác
        </h4>
        {fakeReviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
            <div className="flex items-center mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className="text-lg text-yellow-500">
                  &#9733;
                </span>
              ))}
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <p className="text-gray-600 text-sm">-- {review.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;
