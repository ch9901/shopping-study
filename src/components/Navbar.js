import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
const menuList = ["Woman", "Man", "Kids", "Acc", "Home", "Sale", "Brand"];

//로그인 되었는지 확인하려고 authenticate, 로그아웃누르면 상태 바꿔주어야하므로 setAuthenticate
const Navbar = ({ authenticate, setAuthenticate }) => {
  const navigate = useNavigate();
  //검색란에 작성 후 엔터 입력 시 작동할 함수 ex) 후드티 입력 후 해당 단어가 포함 된 상품표기 >> filter 함수 사용안하고 쿼리값을 통해서 찾아올것이다. >> 검색 한 단어가 주소창으로 전달되어야함
  const onCheckEnter = (event) => {
    //onKeyup >> 해당 눌린 키를 인식함
    if (event.key === "Enter") {
      //form안에 있는 target이라는 key 안에 value 값을 찾아옴 해당 값을 쿼리값으로 주소창에 보낸다.
      navigate(`?q=${event.target.value}`);

    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="nav-header">
        <div className="burger-menu">
          <FontAwesomeIcon icon={faBars} />
        </div>
        {authenticate ? (
          <div onClick={() => setAuthenticate(false)}>
            <FontAwesomeIcon icon={faUser} />
            <span style={{ cursor: "pointer" }}>Logout</span>
          </div>
        ) : (
          <div onClick={goToLogin}>
            <FontAwesomeIcon icon={faUser} />
            <span style={{ cursor: "pointer" }}>Login</span>
          </div>
        )}
      </div>
      <div className="nav-logo">
        <Link to="/">
          <img
            src="https://www.shinailbo.co.kr/news/photo/202106/1419496_624961_3416.jpg"
            alt="logo"
            width={150}
          />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href="#">{menu}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="search-box">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          onKeyUp={onCheckEnter}
        />
      </div>
    </div>
  );
};

export default Navbar;
