import { useState } from "react";
import style from "../Styles/Seat.module.css";


export default function Seat({ data,addSeat,removeSeat }) {
    const [isClicked,setIsClicked]=useState(false);

    const handleClick=()=>{
        if(isClicked){
            removeSeat(data);
        }
        else{
            addSeat(data);
        }
        setIsClicked(!isClicked);
        console.log(data);
        
    }

    return(
        data.is_reserved?
        <button className={style.nonReservedSeat} disabled>
            {data.seat_number} 
        </button>
        :
        <button onClick={handleClick} className={ isClicked? style.line: style.reservedSeat} >
            {data.seat_number}
        </button>
    )
}


// ✅