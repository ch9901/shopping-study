import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  Button,
} from "react-bootstrap";

const ProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(undefined);
  const { id } = useParams();
  console.log(`params:${id}`);
  //json api 데이터 불러오는 함수
  const getProductsDetail = async () => {
    setLoading(true);
    //우리가 fake로 호스팅 한 json url
    const url = `https://my-json-server.typicode.com/ch9901/shopping-study/products/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    setProduct(data);
    // console.log(data);
    //useState를 통해 data를 product로 전달
  };
  useEffect(() => {
    getProductsDetail();
  }, []);
  // if (loading || product === undefined) {
  //   return <h1>loading</h1>;
  // } else {
  // }
  return (
    <Container>
      <Row>
        <Col className="product-detail-img">
          <img src={product?.img} alt="productimg" />
        </Col>
        <Col>
          <div className="product-info">{product?.title}</div>
          <div className="product-info">{product?.price}</div>
          <div className="choice">
            {product?.choice ? "Conscious Choice" : ""}
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
              Select Size
            </Dropdown.Toggle>
            <DropdownMenu>
              {product?.size.length > 0 &&
                product?.size.map((it, index) => (
                  <Dropdown.Item key={index} href="#/action">
                    {it}
                  </Dropdown.Item>
                ))}
            </DropdownMenu>
          </Dropdown>
          <Button variant="dark" className="add-button">
            Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
