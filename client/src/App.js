import LoginPage from "./Pages/login_page/LoginPage";
import SignupPage from "./Pages/signup_page/SignupPage";
import "./Styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/sign-up" element={<SignupPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
