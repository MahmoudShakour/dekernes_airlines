import { useState } from "react";
import LoginPage from "./Pages/login_page/LoginPage";
import SignupPage from "./Pages/signup_page/SignupPage";
import "./Styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/home_page/HomePage";
import FlightPage from "./Pages/flight_page/FlightPage";
import SeatPage from "./Pages/seat_page/SeatPage";
import PurchasePage from "./Pages/purchase_page/PurchasePage";

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
          element={<LoginPage changeUser={changeUser} />}
        />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="/flight" element={<FlightPage />} />
        <Route path="/seat/:flight_number" element={<SeatPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
