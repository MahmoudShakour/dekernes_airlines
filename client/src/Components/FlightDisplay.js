import style from "../Styles/FlightDisplay.module.css";
import moment from "moment";
export default function FlightDisplay({ flights }) {
  return (
    <div className={style.container}>
      {flights.length === 0 ? (
        <div className={style.message}>
          There is no flights with the specified properties.
        </div>
      ) : (
        <div className={style.container}>
          {flights.map((flight, index) => {
            return (
              <div className={style.flightItem} key={index}>
                <div className={style.section}>
                  <div>From: {flight.source_country}</div>
                  <div>To: {flight.dest_country}</div>
                </div>
                <div className={style.section}>
                  <div>
                    Date: {moment(flight.flight_date).format("YYYY-MM-DD")}
                  </div>
                  <div>Time: {flight.flight_time}</div>
                  <div>Type: {flight.flight_type}</div>
                </div>
                <div className={style.section}>
                  <div>Price: 1000$</div>
                  <div>Available seats: 30</div>
                  <button className={style.button}>Preserve Now</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
