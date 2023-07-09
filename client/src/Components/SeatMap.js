import FlightSeats from "../Api/FlightSeats";
import style from "../Styles/SeatMap.module.css";
import { useEffect, useState } from "react";
import SeatRow from "./SeatRow";
export default function SeatMap({ flight_number, addSeat, removeSeat,handleAirplaneCode }) {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const getSeats = async () => {
      try {
        const response = await FlightSeats(flight_number);
        if (response) {
          setSeats(response.seats);
          handleAirplaneCode(response.airplane_code);
        }
      } catch (e) {
        console.error("error ", e);
      }
    };

    getSeats();
  }, []);

  return (
    <div className={style.seatMap}>
      <div className={style.container}>
        {seats.map((row, index) => (
          <SeatRow
            key={index}
            seats={row}
            addSeat={addSeat}
            removeSeat={removeSeat}
          />
        ))}
      </div>
    </div>
  );
}
