import { useState } from "react";
import LoginPage from "./Pages/login_page/LoginPage";
import SignupPage from "./Pages/signup_page/SignupPage";
import "./Styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/home_page/HomePage";

function App() {
  const [user, setUser] = useState(null);

  const changeUser= (newUser)=>{
    setUser(newUser);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage user={user} changeUser={changeUser} />} />
        <Route path="/sign-up" element={<SignupPage user={user} />} />
        <Route path="/" element={<HomePage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
