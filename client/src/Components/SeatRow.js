import Seat from "./Seat";
import style from "../Styles/SeatRow.module.css";

export default function SeatRow({ seats }) {

  return (
    <div className={style.row} >
      <div className={style.subRow} >
        <Seat data={seats[0]} key={0} />
        <Seat data={seats[1]} key={1} />
      </div>
      <div className={style.subRow} >
        <Seat data={seats[2]} key={2} />
        <Seat data={seats[3]} key={3} />
      </div>
    </div>
  );
}
