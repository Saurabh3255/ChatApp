import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/home";
import Login from "./login/index";
import Signup from "./signup/index";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
