import filterFlight from "../Api/filterFlight";
import style from "../Styles/FlightFilter.module.css";

export default function FlightFilter({setFlights}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={
      from: e.target.from.value,
      to: e.target.to.value,
      beginDate: e.target.startdate.value,
      endDate: e.target.enddate.value,
      type: e.target.flight_type.value,
    };
    const flights=await filterFlight(data);
    console.log(flights);
    if(flights===false){
      console.log("error");
    }
    else{
      setFlights([...flights]);
    }
  };

  return (
    <form
      className={style.flightForm}
      action=""
      method="POST"
      onSubmit={handleSubmit}
    >
      <div>Filter</div>
      <input type="text" id="from" placeholder="from" name="from" />
      <input type="text" id="to" placeholder="to" name="to" />
      <input
        type="date"
        id="startdate"
        placeholder="startdate"
        name="startdate"
      />
      <input type="date" id="enddate" placeholder="enddate" name="enddate" />
      <label>
        <input type="radio" id="domestic" name="flight_type" value="domestic" />
        domestic
      </label>
      <label>
        <input
          type="radio"
          id="international"
          name="flight_type"
          value="international"
        />
        international
      </label>
      <button type="submit">Filter</button>
    </form>
  );
}
