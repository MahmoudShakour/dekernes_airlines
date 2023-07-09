import { useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import SeatInfo from "../../Components/SeatInfo";
import style from "./SeatPage.module.css";
import SeatMap from "../../Components/SeatMap";
import SeatSummary from "../../Components/SeatSummary";
import { useState } from "react";

export default function SeatPage({ user }) {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [airplaneCode,setAirplaceCode]=useState("");
  const { flight_number } = useParams();

  const addSeat = (seat) => {
    setBookedSeats([...bookedSeats,seat]);
  };

  const removeSeat = (removedSeat) => {
    const updatedSeats = bookedSeats.filter((seat) => seat.seat_number !== removedSeat.seat_number);
    setBookedSeats(updatedSeats);
  };

  return (
    <div className={style.page}>
      <NavBar user={user} />
      <SeatInfo />
      <SeatMap flight_number={flight_number} handleAirplaneCode={setAirplaceCode} addSeat={addSeat} removeSeat={removeSeat} />
      <SeatSummary  bookedSeats={bookedSeats} flight_number={flight_number} airplane_code={airplaneCode}  />
    </div>
  );
}
