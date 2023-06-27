var query=require('./execute_query');

async function isUserExists(username){
    const user=await query(`select * from customer where username=?`,[username]);
    return user;
}

async function createUser(firstname,lastname,username,password,email){
    const user=await query(`INSERT INTO customer (first_name, last_name, username, password, email) VALUES (?,?,?,?,?)`,[firstname,lastname,username,password,email]);
    // const user2=await query(`INSERT INTO customer (first_name, last_name, username, password, email) VALUES ('John', 'Doe', 'johndoe', 'password123', 'johndoe@example.com')`);
    
    return user;
}

async function getUsers(){
    const users=await query(`SELECT * FROM customer`,[]);
    return users;
}


async function filterFlights(data){
    console.log(data);
    const flights=await query(`
    SELECT flight_number,flight_date,flight_type,flight_time,src.country as source_country,dest.country as dest_country 
    FROM flight 
    join airport as src on src.airport_code=flight.source_airport
    join airport as dest  on dest.airport_code=flight.destination_airport
    WHERE
    (src.country=?) AND
    (dest.country=?) AND
    (flight_date>=?) AND
    (flight_date<=?) AND
    (flight_type=?)
    `,data);
    return flights;
}

module.exports={
    isUserExists,
    createUser,
    getUsers,
    filterFlights
}