import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import ShopList from "../components/ShopList";
import { getAllProduct } from "../api/productApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllProduct(1, 20);
    if (data.isSuccess) {
      if (data.result != null) {
        setProducts(data.result.items);
      } else {
        setProducts([]);
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SliderHome />
      <div className="container">
        <ShopList productItems={products} />
      </div>
    </>
  );
};

export default Home;
