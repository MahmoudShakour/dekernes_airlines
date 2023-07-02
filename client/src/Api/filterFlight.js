async function filterFlight(data){
    const token=localStorage.getItem('token');
    console.log(token);
    const response=await fetch("http://localhost:3000/flight", {
      method: "POST",
      headers: { 
        Authorization: "Bearer "+token, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if(response.ok){
        const resp=await response.json();   
        console.log(resp);
        return resp;
    }
    else{
        return false;
    }
}

export default filterFlight;