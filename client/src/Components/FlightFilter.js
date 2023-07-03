import filterFlight from "../Api/filterFlight";
import style from "../Styles/FlightFilter.module.css";
import location from "../Assets/location.svg";
import date from "../Assets/date.svg";

export default function FlightFilter({ setFlights }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      from: e.target.from.value,
      to: e.target.to.value,
      beginDate: e.target.startdate.value,
      endDate: e.target.enddate.value,
      type: e.target.flight_type.value,
    };
    const flights = await filterFlight(data);
    console.log(flights);
    if (flights === false) {
      console.log("error");
    } else {
      setFlights([...flights]);
    }
  };

  return (
    <form className={style.flightForm} method="POST" onSubmit={handleSubmit}>
      <div className={style.container}>
        <img className={style.location} src={location} required alt="" />
        <input type="text" id="from" placeholder="from*" name="from" />
      </div>
      <div className={style.container}>
        <img className={style.location} src={location} required alt="" />
        <input type="text" id="to" placeholder="to*" name="to" />
      </div>
      <div className={style.container}>
        <img className={style.date} src={date} required alt="" />
        <input type="text" id="startdate" placeholder="start date*" name="startdate" />
      </div>
      <div className={style.container}>
        <img className={style.date} src={date} required alt="" />
        <input type="text" id="enddate" placeholder="end date*" name="enddate" />
      </div>
      <button type="submit">Filter</button>
    </form>
  );
}
