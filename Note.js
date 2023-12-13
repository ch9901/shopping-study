/*필요한 페이지

1. login페이지
2. product all 
2-1. productDetail

공통페이지
1. navbar
2. product card (썸네일이미지표기)

Route
1. PrivateRouter >> 로그인 한 사람만 product detail에 접근 할 수 있게끔

-----------------------------------------------------------------------
페이지를 분기하는 방식에 대한 효율성 > 컴포넌트 구조화
state값을 기준으로 하는 편 -> state간의 연관성이 없으면 분기시켜 관리 ex 날씨, 쇼핑

라우터설치
npm i react-router-dom

부트스트랩설치
npm install react-bootstrap bootstrap

폰트어썸 설치, 사용
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome

폰트어썸의 스타일 컨트롤
npm i --save @fortawesome/pro-solid-svg-icons
npm i --save @fortawesome/pro-regular-svg-icons
npm i --save @fortawesome/pro-light-svg-icons
npm i --save @fortawesome/pro-duotone-svg-icons

--------------------------------------------------
프로젝트 스타트

경로분기(state를 기준으로)
** index.js 안에 app.js를 BrowerRouter로 감싸고 시작 >> 해당 부분 없으면 아무리 router기능을 넣는다 한들 구현되지 않음

페이지 생성
page
-login
-product all
-productdetail

components
-navbar
-productcard

routes
-privateroute


-------------------------------------------------------
App.js > route, routes import 시키기 
> 표기 할 페이지 path="/경로값" element={연결 할 컴포넌트} 입력

<Route path="/product/:id" element={<ProductDetail />} />
>> 경로값 뒤에 /:id 붙으면 product의 세부 페이지를 나누고 싶으면 뭐시기


공통으로 쓰여 질 요소인 navbar는 분기해 주지 않을 것이지 때문에 Routes 위에 컴포넌트를 입력해준다.

-------------------------------------------------------
Navbar.js
폰트어썸 사용 할 것이므로 import

메뉴에 들어가는 요소 배열로 정의

로그인이 되어있다고 어떻게 인지하나? >> login이라는 문자열이 logout이라고 되어있다면 .. 

이미지 클릭 시 메인페이지로 이동하게 끔 하기 위해 Link 컴포넌트 import
<Link to="/"> 이미지 </Link>

menulist > map함수로 돌려서 출력 
해당함수로 출력을 하게 된다면 각각의 고유 key값을 전달해야 오류메세지가 뜨지않는다. >> 해당 이유로 index도 같이 돌려서 key값에 전달!

상품검색 >> 쿼리값을 통해서 찾아올거임 
검색란에 작성 후 엔터 입력 시 작동할 함수 ex) 후드티 입력 후 해당 단어가 포함 된 상품표기 >> filter 함수 사용안하고 쿼리값을 통해서 찾아올것이다. >> 검색 한 단어가 주소창으로 전달되어야함

-------------------------------------------------------

++ json을 외부에 호스팅 해서 사용할 수 는 없을까?
google >> json server npm >> npm json server 
https://www.npmjs.com/package/json-server

npm i -g json-server >> 전역으로설치
npm i json-server >> 우리가 설치해서 사용했다는거 알려주기 위한 설치

내가 스스로 json을 만들어서 서버에 업로드, fetch()를 활용해 외부 api를 가져온 것 처럼 작업 할 수있도록 가짜 서버를 제공해준다.

* 주의 ) json을 가지고 올 때 restful api 경로값에 대한 표준 시스템을 따라야한다? 
http://localhost:3004/products >> 전체 데이터 값이 보여짐
http://localhost:3004/products/1 >> 1번의 id값을 가진 데이터만 보여짐

* 주의 ) Altenative port  : 포트번호를 여러개 쓰면서 여러개의 프로젝트를 같이 작업중 // json은 기본적으로 3000포트를 사용하게 되어있음 >> 지금 우리가 3000번 포트에 작업중인데 json을열게 되면 진행중인 프로젝트가 닫히게 된다. 해당 문제를 방지하고자 json서버를 지정해주어야 함.
json-server --watch db.json --port 3004 >> 3004 port를 사용함 > 터미널에 링크가 뜬다.

* 주의 ) 사용 할 json 파일은 가장 바깥쪽에 위치해있어야 함. package.json과 같은 위치

* 주의 ) json 파일을 업로드하여 3004포트로 연 터미널은 닫으면 안된다. json을 업로드해서 포트로 호스팅 된 것 처럼 사용을 하고있기에 터미널을 닫으면 json파일포트가 닫혀 사용할수없게 된다. >> 내가 작업하고자 하는 npm start run은 다른 터미널을 열어서 구동시켜줘야함



-------------------------------------------------------------------

productAll.js
호스팅 한 json을 불러오는 함수 설정 >> 해당 함수 처음 렌더링 될때 불러와야 하므로 useEffect활용해서 함수실행

데이터를 사용할 컴포넌트는 productAll, productCard
productAll안에서 card 컴포넌트를 사용할 것임

-------------------------------------------------------------------
productCard.js
bootstrap의 grid기능 활용해서 스타일링
auto-layout-colums >> width값 자동으로 균등하게 가져간다 > 하루한개에 쓸 수 있나?
bootstrap할때 css 임포트 해줘야함

bootstrap 추가설명
1행 4열 일때 데스크탑의 device width가 긴 경우
<Row>
<Col {lg="3"}>1</Col>
<Col {lg="3"}>1</Col>
<Col {lg="3"}>1</Col>
<Col {lg="3"}>1</Col>
<Row>
--> 12개의 열 중에 3개씩 너비를 가져가라

device width가 짧은 경우
<Row>
<Col {sm="6"}>1</Col>
<Col {sm="6"}>1</Col>
<Row>

sm, lg 이게 device 넓이인가 그런거같음

-------------------------------------------------------------------
ProductAll.js
productCard를 container , row, col로 감싸줌

json 데이터를 전역으로 사용하기 위해(데이터를 출력하기 위함) useState 사용

해당 데이터를 map 함수를 통해 item이라는 변수로 productcard에 전달

-------------------------------------------------------------------

ProductCard.js
객체로 받아온 item 을 태그들에 변수값으로 출력해주기
신상품 표기란은 new: boolean값으로 지정되어있음
<div>{item?.new === true ? "NEW" : "Sale"}</div>
true값이면 new 출력 false 값이면 sale 출력

------------------------------------------------------------------
로그인 클릭했을 때 
navbar.js
useNavigate

onSubmit >> 서브밋을 하게되면

로그인이 되었다 ! 라는것을인식시켜줘야함 >> 어떻게 인식해야하는가 ?
-개발자입장
기본적으로는 로그인은 안된상태 >> 로그인 절차를 거치게 되면 로그인이 된다. 해당 상태를 거치면 로그아웃으로 바꿔준다.
-컴퓨터입장
현재상태가 로그인 / 로그아웃 인지 어떻게 알까 ? >> 현재 우리 상태를 전달해주어야한다.

해당 여부는 App.js에서 써야한다 왜?
실제로 로그인이 되었다고 판단이 된다면 상세페이지를 들어갈수있게 할건지 말건지 다른애들도 알아야하기 때문이다.


------------------------------------------------------------------
App.js
로그인 됐는지 안됐는지 상태관리
        <Route
          path="/login"
          element={<Login setAuthenticate={setAuthenticate} />}
        />
--> 로그인 됐는지 안됐는지 상태관리해서 login에 전달해주어야한다.

Login.js
loginUser >> 작동이 된다면 로그인 하는 것이기 때문에 setAuthenticate의 값을 true로 바꿔준것


------------------------------------------------------------------
App.js
로그인에 대한 boolean값이 변할경우 useEffect를 사용하여 

------------------------------------------------------------------
navbar.js
로그인했으니까 login >> logout으로 바꿔줘야 함
참 이라면 ? 로그아웃 출력 false라면 로그인 출력
        {authenticate ? (
          <div onClick={setAuthenticate(false)}>
            <FontAwesomeIcon icon={faUser} />
            <span style={{ cursor: "pointer" }}>Logout</span>
          </div>
        ) : (
          <div onClick={goToLogin}>
            <FontAwesomeIcon icon={faUser} />
            <span style={{ cursor: "pointer" }}>Login</span>
          </div>
        )}

해당 부분이 로그아웃 상태라면 setAuthenticate값이 false로 바뀌어야하므로 onClick으로 해당 상태에 false값을 전달한다.
-----------------------------------------------------------------
로그인이 됐는지 구분 >> privateroute.js를 통해서 
const PrivateRoute = ({ authenticate }) => {
  return authenticate === true ? <ProductDetail /> : <Navigate to="/login" />;
};
----------------------------------------------------------------
productcard는 로그인 됐는지 아닌지 어떻게 판단하는가 ?? 

<Route path="/product/:id" 
element={<PrivateRoute authenticate={authenticate} />}/>

얘는 무조건 id값을 갖게 되어있음 >> 아이디값을 가진 페이지로 가게 되면 자동으로 로그인 값을 판단하게 된다.

  const showDetail = () => {
    navigate(`/product/${item.id}}`);
  };

--------------------------------------
prodectDetail

-------------------------------------
검색창 구현
productAll.js 
useSearchParams import

구조분해할당으로 할당해줌 
query.get("q")
>>q를 키 값으로 갖는 value값을 찾아옴 해당 값을
변수에 저장
>> 저장 된 변수를 url값으로 전달 >> 해당하는 json만 가져옴

--------------------------------------------
json을 어떻게 배포할것인가 ?? >> 타인이 봤을 때 콘텐츠가 다 나와야하기 때문
goggle >> my json server
https://my-json-server.typicode.com/
git repository 만들어서 db.json 이름으로 json 업로드
https://my-json-server.typicode.com/ch9901/shopping-study



---------------------------------------------
해당 프로젝트의 핵심
1. 라우트기능
2. useNavigate, useParams, useSearchParams

api경로에 대해 학습

3. 검색기능
4. useState를 활용하여 login 여부 판단
5. fake json server 

마우스 오버시 스케일 , 위치
네비게이션 디자인
로그인창디자인
상세페이지 디자인























*/
