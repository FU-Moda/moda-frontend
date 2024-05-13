import { Container, Row, Col } from "react-bootstrap";

const SlideCard = ({ title, desc, cover }) => {
  return (
    <Container className="mt-20 px-10 pb-16">
      <Row className="items-center">
        <Col md={6}>
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <p className="mb-6">{desc}</p>
          <button className="bg-[#0f3460] text-white py-2 px-4 rounded-md hover:bg-[#0c2c4d] transition-colors duration-300">
            Visit Collections
          </button>
        </Col>
        <Col md={6}>
          <img src={cover} alt="#" className="max-h-80 object-contain" />
        </Col>
      </Row>
    </Container>
  );
};

export default SlideCard;