
const PricingOption = ({
    title,
    description,
    price,
    status,
    isDashboardAvailable,
    isBannerAvailable,
    onSelectPackage,
    isUsed
  }) => {
    const cardClasses = `card shadow-xl bg-white p-6 rounded-lg`;
    const statusText = status === 1 ? "Đang hoạt động" : "Ngừng hoạt động";
    const dashboardText = isDashboardAvailable
      ? "Có thể sử dụng dashboard"
      : "Không thể sử dụng dashboard";
    const bannerText = isBannerAvailable
      ? "Có thể sử dụng banner quảng cáo tại MODA"
      : "Không thể sử dụng banner";
  
    return (
      <div className={cardClasses}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
  
        <div className="mt-4">
        {!isUsed&&
           
          <div className="flex items-center mb-2">
           <span className="text-green-500 font-bold mr-2">
              {price === 0 ? "Miễn phí" : `${price}`}
            </span>
            <span className="text-gray-500">{statusText}</span>
          </div>
           
        }
          <div className="flex items-start">
            <span className="text-gray-500 font-semibold mr-2">Dashboard:</span>
            <span className="text-gray-600">{dashboardText}</span>
          </div>
          <div className="flex items-start mt-2">
            <span className="text-gray-500 font-semibold mr-2">Banner:</span>
            <span className="text-gray-600">{bannerText}</span>
          </div>
        </div>
        
        {!isUsed&&
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onSelectPackage}
        >
          Chọn gói này
        </button>
        
        }
      </div>
    );
  };
export default PricingOption;  