import Seat from "./Seat";
import style from "../Styles/SeatRow.module.css";

export default function SeatRow({ seats,addSeat,removeSeat }) {

  return (
    <div className={style.row} >
      <div className={style.subRow} >
        <Seat data={seats[0]} key={0} addSeat={addSeat} removeSeat={removeSeat} />
        <Seat data={seats[1]} key={1} addSeat={addSeat} removeSeat={removeSeat} />
      </div>
      <div className={style.subRow} >
        <Seat data={seats[2]} key={2} addSeat={addSeat} removeSeat={removeSeat} />
        <Seat data={seats[3]} key={3} addSeat={addSeat} removeSeat={removeSeat} />
      </div>
    </div>
  );
}
