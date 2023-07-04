import style from "../Styles/SeatInfo.module.css";

export default function SeatInfo() {
  return (
    <div className={style.container}>
      <div className={style.title}>Choose your seats.</div>
      <div className={style.info} >
        <div className={style.section}>
          <div className={style.black}></div>
          <div>Reserved seat.</div>
        </div>
        <div className={style.section}>
          <div className={style.green}></div>
          <div>Unreserved VIP seat.</div>
        </div>
        <div className={style.section}>
          <div className={style.white}></div>
          <div>Unreserved classic seat.</div>
        </div>
      </div>
    </div>
  );
}
