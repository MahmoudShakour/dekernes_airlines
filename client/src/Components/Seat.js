import style from "../Styles/Seat.module.css";


export default function Seat({ data }) {

    return(
        data.is_reserved?
        <button className={style.nonReservedSeat} disabled>
            {data.seat_number} 
        </button>
        :
        <button className={style.reservedSeat} >
            {data.seat_number}
        </button>
    )
}


// ✅