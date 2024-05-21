import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import SlideCard from "./SliderCard/SlideCard";
import { SliderData } from "../utils/products";

const SliderHome = () => {
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://daisyui.com/images/stock/photo-1605773513718-00c4cb32d5ec.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Best E-Commerce Site</h1>
          <p className="py-6">
            Welcome to our e-commerce site! Explore our wide range of products
            and find the perfect item for you.
          </p>
          <button className="btn btn-primary">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default SliderHome;
