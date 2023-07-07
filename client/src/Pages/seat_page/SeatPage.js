import { useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import SeatInfo from "../../Components/SeatInfo";
import style from "./SeatPage.module.css";
import SeatMap from "../../Components/SeatMap";
import SeatSummary from "../../Components/SeatSummary";

export default function SeatPage({user}) {
  const {flight_number}=useParams();

  return (
    <div className={style.page}>
      <NavBar user={user} />
      <SeatInfo/>
      <SeatMap flight_number={flight_number} />
      <SeatSummary/>
    </div>
  );
}
