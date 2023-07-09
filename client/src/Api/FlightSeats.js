async function FlightSeats(flightNumber){
    const token=localStorage.getItem('token');
    const response=await fetch("http://localhost:3000/seat/"+flightNumber, {
      method: "GET",
      headers: { 
        Authorization: "Bearer "+token, 
        "Content-Type": "application/json",
      }
    });
    console.log("hi");
    if(response.ok){
        const resp=await response.json();   
        console.log(resp);
        console.log("here");
        return resp;
    }
    else{
        return false;
    }
}

export default FlightSeats;