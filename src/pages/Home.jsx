import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  const shops = [
    {
      name: "Shop A",
      logo: "https://i.pinimg.com/564x/f5/8b/2f/f58b2f0c7a2fd7f36b6fb9091c8ba9b3.jpg",
    },
    {
      name: "Shop B",
      logo: "https://i.pinimg.com/564x/d8/1d/e7/d81de72e77f6ec7a7c0f6f3d5c0d2399.jpg",
    },
    {
      name: "Shop C",
      logo: "https://i.pinimg.com/564x/5b/2f/9e/5b2f9e8e9d96bb7d1bfd1059f7a7768f.jpg",
    },
    // Add more shops here
  ];

  const products = [
    {
      name: "Product A",
      image:
        "https://i.pinimg.com/564x/be/5d/0f/be5d0f846da9e0ed44c5a8e7e1563f7a.jpg",
      price: 49.99,
    },
    {
      name: "Product B",
      image:
        "https://i.pinimg.com/564x/39/c6/da/39c6da4fe7b8bebbde8b9f1ef0e9b2aa.jpg",
      price: 29.99,
    },
    {
      name: "Product C",
      image:
        "https://i.pinimg.com/564x/a5/ec/14/a5ec14a36aa0be3b53ddc65bde4d1b7c.jpg",
      price: 39.99,
    },
  ];

  const categories = [
    {
      name: "Electronics",
      icon: "https://i.pinimg.com/564x/f5/8b/2f/f58b2f0c7a2fd7f36b6fb9091c8ba9b3.jpg",
    },
    {
      name: "Fashion",
      icon: "https://i.pinimg.com/564x/d8/1d/e7/d81de72e77f6ec7a7c0f6f3d5c0d2399.jpg",
    },
    {
      name: "Home & Garden",
      icon: "https://i.pinimg.com/564x/5b/2f/9e/5b2f9e8e9d96bb7d1bfd1059f7a7768f.jpg",
    },
    // Add more categories here
  ];
  return (
    <>
      <SliderHome />
      <div className="carousel rounded-box">
        {shops.map((shop, index) => (
          <div key={index} className="carousel-item">
            <img src={shop.logo} alt={shop.name} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={product.image} alt={product.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>${product.price}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={category.icon} alt={category.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{category.name}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Shop Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
