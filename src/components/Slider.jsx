import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../Images/banner.png";
const SliderHome = () => {
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="hero min-h-screen shadow-md rounded-xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={banner} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Sàn thương mại bán đồ 2nd tốt nhất thị trường Việt Nam
          </h1>
          <p className="py-6 opacity-60">
            Dự án MODA tạo ra nền tảng xã hội kết nối doanh nghiệp thời
            trang(tập trung vào mảng thời trang second hand và sản phẩm out
            season) với khách hàng, đặc biệt là giới trẻ quan tâm đến môi
            trường. MODA giúp cung cấp quần áo đã qua sử dụng với giá cả phải
            chăng, giải quyết tồn kho, thúc đẩy tiêu dùng bền vững và khuyến
            khích thời trang có trách nhiệm.
          </p>
          <button className="btn bg-primary text-white">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default SliderHome;
