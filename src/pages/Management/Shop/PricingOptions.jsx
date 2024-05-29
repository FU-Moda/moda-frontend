import React from "react";

const PricingOption = ({ title, description, features, price, isPopular }) => {
  const cardClasses = `card shadow-xl ${
    isPopular ? "bg-green-500 text-white" : "bg-white"
  }`;

  return (
    <div className={cardClasses}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="mt-4">
          <span
            className={`badge font-bold ${
              isPopular ? "bg-white text-green-500" : "bg-green-500 text-white"
            }`}
          >
            {`${price === 0 ? "Miễn phí" : `${price} VNĐ/tháng`}`}
          </span>
        </div>
        <div className="mt-6">
          <ul className="list-disc ml-6">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        {isPopular && (
          <div className="mt-4">
            <span className="badge badge-accent bg-yellow-500 text-white">
              Phổ biến nhất
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const PricingOptions = () => {
  const options = [
    {
      title: "Gói cơ bản (Miễn phí)",
      description:
        "Phù hợp với: Doanh nghiệp mới tham gia MODA, muốn thử nghiệm nền tảng và tiếp cận khách hàng mới.",
      features: [
        "Đăng sản phẩm không giới hạn.",
        "Quản lý đơn hàng cơ bản.",
        "Hỗ trợ khách hàng qua email.",
        "Tham gia các chương trình khuyến mãi chung của MODA.",
      ],
      price: 0,
      isPopular: false,
    },
    {
      title: "Gói nâng cao",
      description:
        "Phù hợp với: Doanh nghiệp muốn tăng khả năng hiển thị sản phẩm và thu hút khách hàng.",
      features: [
        "Tất cả các tính năng của gói cơ bản.",
        "Quảng cáo sản phẩm trên trang chủ MODA.",
        "Tham gia các chương trình khuyến mãi độc quyền của MODA.",
        "Hỗ trợ khách hàng qua điện thoại.",
        "Báo cáo thống kê doanh thu.",
      ],
      price: 500000,
      isPopular: true,
    },
    {
      title: "Gói cao cấp",
      description:
        "Phù hợp với: Doanh nghiệp muốn tối ưu hóa hiệu quả bán hàng và xây dựng thương hiệu trên MODA.",
      features: [
        "Tất cả các tính năng của gói nâng cao.",
        "Dịch vụ chụp ảnh sản phẩm chuyên nghiệp.",
        "Dịch vụ quản lý kho hàng.",
        "Dịch vụ vận chuyển và giao hàng.",
        "Dịch vụ chăm sóc khách hàng VIP.",
        "Báo cáo thống kê chi tiết về hành vi khách hàng.",
      ],
      price: 1000000,
      isPopular: false,
    },
  ];

  return (
    <div className="container">
      <div className="flex justify-center gap-8 my-8">
        {options.map((option, index) => (
          <PricingOption
            key={index}
            title={option.title}
            description={option.description}
            features={option.features}
            price={option.price}
            isPopular={option.isPopular}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingOptions;
