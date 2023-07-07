import style from "../Styles/Seatsummary.module.css";


export default function SeatSummary() {

    return(
        <div className={style.seatSummary} >
            <div className={style.seatInfo} >
                <div>infoinfoinfoinfoinfoinfo</div>
                <div>infoinfoinfoinfoinfoinfo</div>
                <div>infoinfoinfoinfoinfoinfo</div>
                <div>infoinfoinfoinfoinfoinfo</div>
            </div>
            <div className={style.section} >
                <div>total seats: </div>
                <div>total price: </div>
                <button>Confirm</button>
            </div>

        </div>
    )






}
