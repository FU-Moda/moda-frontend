import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getProductById } from "../api/productApi";
import Loader from "../components/Loader/Loader";
const Product = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getProductById(id);
    if (data.isSuccess) {
      setSelectedProduct(data.result);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  useWindowScrollToTop();

  return (
    <Fragment>
      <Loader isLoading={isLoading} />
      {isLoading === false && (
        <>
          <Banner title={selectedProduct?.product?.name} />
          <ProductDetails selectedProduct={selectedProduct} />
          {/* <ProductReviews selectedProduct={selectedProduct} /> */}
          <section className="related-products">
            <Container>
              <h3>You might also like</h3>
            </Container>
            {/* <ShopList productItems={relatedProducts} /> */}
          </section>
        </>
      )}
    </Fragment>
  );
};

export default Product;
