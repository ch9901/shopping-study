import React, { useState, useEffect } from "react";
// import data from "../db.json"; >> 원래는 이렇게 했다
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductAll = () => {
  // json 데이터를 전역으로 사용하기 위해(데이터를 출력하기 위함) useState 사용 배열로 받아올 것이며, 아무런 값도 받아오지못할때를 대비하여 초기값은 빈배열로
  const [productList, setProductList] = useState([]);
  //검색창구현을 위한
  const [query, setQuery] = useSearchParams();

  //json api 데이터 불러오는 함수
  const getProducts = async () => {
    //검색창
    const searchQuery = query.get("q") || "";
    console.log(searchQuery);

    //우리가 fake로 호스팅 한 json url
    const url = `https://my-json-server.typicode.com/ch9901/shopping-study/products?q=${searchQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    //useState를 통해 data를 productList로 전달
    setProductList(data);
  };
  // 처음 마운트가 될 때, query검색해서 url값이 바뀔 때 json데이터를 가져오기
  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <Container>
      <Row>
        {productList.map((menu, index) => (
          <Col lg={3} key={index}>
            <ProductCard item={menu} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
