import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const ProductDetail = () => {
  const [product, setProduct] = useState(undefined);
  const { id } = useParams();
  console.log(`params:${id}`);
  //json api 데이터 불러오는 함수
  const getProductsDetail = async () => {
    //우리가 fake로 호스팅 한 json url
    const url = 'http://localhost:3004/products';
    const response = await fetch(url);
    const data = await response.json();
    setProduct(data);
    // console.log(data);
    //useState를 통해 data를 product로 전달
  };
  useEffect(() => {
    getProductsDetail();
  }, []);
  // console.log(productList);
  // const item = productList[id];
  // const i = JSON.stringify(item);
  // console.log(i);
  return (
    <Container>
      <Row>
        <Col className="product-detail-img">
          <img src={product?.img} alt="productimg" />
        </Col>
        <Col>
          <div className="product-info">{product?.title}</div>
          <div className="product-info">{product?.price}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
