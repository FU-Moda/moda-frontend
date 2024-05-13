import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getAllProduct } from "../api/productApi";
import Loader from "../components/Loader/Loader";

const Shop = () => {
  // const [filterList, setFilterList] = useState(
  //   products.filter((item) => item.category === "sofa")
  // );
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllProduct(1, 10);
    if (data.isSuccess) {
      setProducts(data.result.items);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useWindowScrollToTop();

  return (
    <Fragment>
      <Loader isLoading={isLoading} />
      <Banner title="Sản Phẩm" />

      <section className="mt-10 filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={products} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={products} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={products} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
