import style from "../Styles/Seat.module.css";


export default function Seat({ data }) {

    return(
        <button className={style.seat} >
            {data.seat_number}
        </button>
    )
}
