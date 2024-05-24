import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getAllProduct, getAllProductByFilter } from "../api/productApi";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { useParams } from "react-router-dom";

const Shop = () => {
  // const [filterList, setFilterList] = useState(
  //   products.filter((item) => item.category === "sofa")
  // );
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllProductByFilter(1, 10, {
      clothType: Number(id),
    });
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
  }, [id]);
  useWindowScrollToTop();

  return (
    <Fragment>
      <LoadingComponent isLoading={isLoading} />
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
