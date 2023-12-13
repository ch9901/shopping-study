import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProductAll from "./pages/ProductAll";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  //로그인 여부 상태관리 true = login, false=logout
  const [authenticate, setAuthenticate] = useState(false);

  //로그인에 대한 boolean값이 바뀌었을 때 작동하게 끔 !
  useEffect(() => {
    console.log(authenticate);
  }, [authenticate]);

  return (
    <div className="App">
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} />
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route
          path="/login"
          element={<Login setAuthenticate={setAuthenticate} />}
        />
        <Route
          path="/product/:id"
          element={<PrivateRoute authenticate={authenticate} />}
        />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Routes>
    </div>
  );
}

export default App;
