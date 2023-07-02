import { useState } from "react";
import LoginPage from "./Pages/login_page/LoginPage";
import SignupPage from "./Pages/signup_page/SignupPage";
import "./Styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/home_page/HomePage";
import FlightPage from "./Pages/flight_page/FlightPage";

function App() {
  const [user, setUser] = useState(null);

  const changeUser = (newUser) => {
    setUser(newUser);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage user={user} changeUser={changeUser} />}
        />
        <Route path="/sign-up" element={<SignupPage user={user} />} />
        <Route exact path="/" element={<HomePage user={user} />} />
        <Route path="/flight" element={<FlightPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
