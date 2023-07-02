async function signIn(data){
    const response=await fetch("http://localhost:3000/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if(response.ok){
        const resp=await response.json();   
        console.log(resp);
        localStorage.setItem('token',resp.accessToken);
        console.log(localStorage.getItem('token'));
        return resp.user;
    }
    else{
        return false;
    }
}

export default signIn;