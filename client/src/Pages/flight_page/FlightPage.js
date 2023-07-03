import { useState } from "react";
import NavBar from "../../Components/NavBar";
import style from "./flightPage.module.css";
import FlightFilter from "../../Components/FlightFilter";
import FlightDisplay from "../../Components/FlightDisplay";

export default function FlightPage({user}) {
  
  const [flights,setFlights]=useState([]);

  return (
    <div className={style.page} >
      <NavBar user={user} />
      <div className={style.formContainer} >
        <FlightFilter setFlights={setFlights} />
        <FlightDisplay flights={flights} />
      </div>
    </div>
  );
}
