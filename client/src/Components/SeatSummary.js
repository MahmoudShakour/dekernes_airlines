import { useEffect, useState } from "react";
import submitPayment from "../Api/Payment";
import style from "../Styles/Seatsummary.module.css";

export default function SeatSummary({ bookedSeats, flight_number,airplane_code }) {
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const price = bookedSeats.reduce(
      (totalPrice, seat) => totalPrice + Number(seat.seat_price),
      0
    );
    setNumber(bookedSeats.length);
    setPrice(price);
  }, [bookedSeats]);

  const handlePayment = async () => {
    const seats = bookedSeats.map((seat) => seat.seat_number);
    submitPayment({ flight_number, seats,airplane_code });
  };

  return (
    <div className={style.seatSummary}>
      <div className={style.seatInfo}>
        {bookedSeats.map((seat, index) => {
          return (
            <div key={index}>
              {index +
                1 +
                ": " +
                seat.seat_number +
                ", " +
                seat.seat_price +
                "$, type: " +
                seat.seat_class}{" "}
            </div>
          );
        })}
      </div>
      <div className={style.section}>
        <div>total seats: {number}</div>
        <div>total price: {price + "$"}</div>
        <button onClick={handlePayment}>Confirm</button>
      </div>
    </div>
  );
}
