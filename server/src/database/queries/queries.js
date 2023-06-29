var query = require("./execute_query");

async function isUserExists(username) {
  const user = await query(`select * from user where username=?`, [username]);
  return user;
}

async function createUser(data) {
  const user = await query(
    `INSERT INTO user (first_name, last_name, username, password, email) VALUES (?,?,?,?,?)`,
    data
  );

  return user;
}

async function getUsers() {
  const users = await query(`SELECT * FROM user`, []);
  return users;
}

async function filterFlights(data) {
  console.log(data);
  const flights = await query(
    `
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
    `,
    data
  );
  return flights;
}

async function getSeatsByFlight(data) {
  const seats = await query(
    `
    SELECT seat_number,seat_class,seat_type,seat_price FROM airplane_seat natural join flight WHERE flight_number=?;
    `,
    data
  );
  return seats;
}

async function getReservedSeatsByFlight(flightId) {
  const reservedSeats = await query(
    `
      SELECT seat_number FROM flight_seat WHERE flight_number=?;
    `,
    [flightId]
  );
  return reservedSeats;
}

async function reserveSeats(flightId, seats, purchaseId, airplane_code) {
  for (let i = 0; i < seats.length; i++) {
    await query(
      `
        INSERT INTO flight_seat (flight_number,airplane_code,seat_number,purchase_id) VALUES (?,?,?,?)
    `,
      [flightId, airplane_code, seats[i], purchaseId]
    );
  }

  //   const x=await query(
  //     `
  //         SELECT * FROM flight_seat
  //     `,
  //       []
  //     );

  //     console.log(x);
}

async function initializePurchase(userId) {
  const purchase = await query(
    `
    INSERT INTO purchase (user_id,purchase_date) VALUES (?,NOW());
    `,
    [userId]
  );

  console.log(purchase);
  return purchase;
}

async function getPurchases(userId) {
  const purchases = await query(
    `
    SELECT purchase_id,flight_number,COUNT(seat_number) as number_of_seats,airplane_code,purchase_date,flight_date FROM 
    purchase NATURAL JOIN flight_seat NATURAL JOIN flight where user_id=?
    GROUP BY purchase_id,flight_number,airplane_code,purchase_date,flight_date;
    `,
    [userId]
  );

  return purchases;
}

async function getOnePurchase(userId, purchaseId) {
  const purchase = await query(
    `
    SELECT * FROM 
    purchase NATURAL JOIN flight_seat NATURAL JOIN flight NATURAL JOIN airplane_seat where purchase_id=?;
    `,
    [purchaseId]
  );

  if (purchase.length === 0) return null;
  if(purchase.user_id!==userId) return false;
  const seats = purchase.map((x) => {
    return {
      seat_number: x.seat_number,
      seat_class: x.seat_class,
      seat_type: x.seat_type,
      seat_price: x.seat_price,
    };
  });
  const data = {
    airplane_code: purchase[0].airplane_code,
    flight_type: purchase[0].flight_type,
    flight_date: purchase[0].flight_date,
    flight_time: purchase[0].flight_time,
    source_airport: purchase[0].source_airport,
    destination_airport: purchase[0].destination_airport,
    purchase_date: purchase[0].purchase_date,
  };
  return { seats, ...data };
}

module.exports = {
  isUserExists,
  createUser,
  getUsers,
  filterFlights,
  getSeatsByFlight,
  getReservedSeatsByFlight,
  reserveSeats,
  initializePurchase,
  getPurchases,
  getOnePurchase,
};
