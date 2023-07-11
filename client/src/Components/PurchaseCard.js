import style from "../Styles/PurchaseCard.module.css";
import moment from "moment";

export default function PurchaseCard({ data }) {
  return (
    <div className={style.card}>
      <div>airplane:{data.airplane_code}</div>
      <div>source airport: {data.source_airport}</div>
      <div>destination airport: {data.destination_airport}</div>
      <div>flight date: { moment(data.flight_date).format("DD-MM-YYYY") + " At " + data.flight_time}</div>
      <div>no. of seats: {data.number_of_seats}</div>
      <div>destination airport:{data.destination_airport}</div>
      <div>purchase date: {moment(data.purchase_date).format("DD-MM-YYYY")}</div>
    </div>
  );
}
