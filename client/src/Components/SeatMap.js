import style from "../Styles/SeatMap.module.css";
export default function SeatMap({ flight_number }) {
  return (
    <div className={style.seatMap}>
      <div className={style.container}>
        {
        [
          ["1D", "2D", "3D", "4D","5D", "6D", "7D", "8D","9D","10D"],
          ["1C", "2C", "3C", "4C","5C", "6C", "7C", "8C","9C","10C"],
          ["1", "2", "3", "4","5", "6", "7", "8","9","10"],
          ["1B", "2B", "3B", "4B","5B", "6B", "7B", "8B","9B","10B"],
          ["1A", "2A", "3A", "4A","5A", "6A", "7A", "8A","9A","10A"],
        ].map((row,index)=>{
            return (
                <div key={index} className={style.row}  >
                    {
                      row.map((el,index)=><div className={style.element} >{el}</div>)
                    }
                </div>
                )
        })
        }
      </div>
      {/* <img className={style.image} src={seatmap} alt=""  /> */}
    </div>
  );
}
