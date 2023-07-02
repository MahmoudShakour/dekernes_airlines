import { useEffect } from "react";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import style from "./flightPage.module.css";
import FlightFilter from "../../Components/FlightFilter";

export default function FlightPage({user}) {
  useEffect(()=>{
    console.log("hi");
    console.log(user);
  },[]);
  return (
    <div className={style.page} >
      <NavBar user={user} />
      <div className={style.formContainer} >
        <FlightFilter/>
      </div>
      <Footer />
    </div>
  );
}
