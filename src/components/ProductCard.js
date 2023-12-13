import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/product/${item.id}`);
  };
  return (
    <div className="product-card" onClick={showDetail}>
      {/* item에 대한 데이터가 끌어 와 졌을 때 이미지를 갖고와라 */}
      <img src={item?.img} alt="" />
      <div>Conscious Choice</div>
      <div>{item?.title}</div>
      <div>₩{item?.price}</div>
      <div>{item?.new === true ? "New" : "Sale"}</div>
    </div>
  );
};

export default ProductCard;
