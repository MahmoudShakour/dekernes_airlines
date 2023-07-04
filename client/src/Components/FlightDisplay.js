import style from "../Styles/FlightDisplay.module.css";
import moment from "moment";
import background from "../Assets/filterbg.svg";
import { Link } from "react-router-dom";
export default function FlightDisplay({ flights }) {
  return flights === null ? (
    <div className={style.background}>
      <img src={background} alt="" />
    </div>
  ) : flights.length === 0 ? (
    <div className={style.message}>
      There is no flights with the specified properties.
    </div>
  ) : (
    <div className={style.container}>
      {flights.map((flight, index) => {
        return (
          <div className={style.flightItem} key={index}>
            <div className={style.section}>
              <div className={style.subSection}>
                <div>From: {flight.source_country}</div>
                <div>To: {flight.dest_country}</div>
                <div>Price: 1000$</div>
              </div>
              <div className={style.subSection}>
                <div>
                  Date: {moment(flight.flight_date).format("YYYY-MM-DD")}
                </div>
                <div>Time: {flight.flight_time}</div>
                <div>Type: {flight.flight_type}</div>
              </div>
            </div>
            <div className={style.section}>
              <button className={style.button}>
                <Link to={"/seat/"+flight.flight_number} >Preserve Now</Link>
              </button>
              <div className={style.seats}>Available seats: 30</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
