async function purchase(data) {
    
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/purchase", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }
    });
  
    if (response.ok) {
      const  resp = await response.json();
      console.log(resp);
      return resp
    }
    return false;
  }
  
  export default submitPayment;
  