import { useEffect, useState } from "react";
import SliderHome from "../components/Slider";
import ShopList from "../components/ShopList";
import { getAllProduct } from "../api/productApi";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    //setIsLoading(true);
    const data = await getAllProduct(1, 20);
    if (data.isSuccess) {
      if (data.result != null) {
        setProducts(data.result.items);
      } else {
        setProducts([]);
      }
      // setIsLoading(false);
    }
    // setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      <SliderHome />
      <div className="container">
        <ShopList productItems={products} />
      </div>
    </>
  );
};

export default Home;
