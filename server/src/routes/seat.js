var express = require("express");
const authToken = require("../middlewares/AuthToken");
const {
  getSeatsByFlight,
  getReservedSeatsByFlight,
  getAirplaneCode,
} = require("../database/queries/queries");
var router = express.Router();

router.get("/:flightId", authToken, async function (req, res, next) {
  console.log("hi");
  let [seats, reservedSeats, airplane_code] = await Promise.all([
    getSeatsByFlight([req.params.flightId]),
    getReservedSeatsByFlight(req.params.flightId),
    getAirplaneCode(req.params.flightId),
  ]);
  reservedSeats = reservedSeats.map((x) => x.seat_number);
  seats = compactData(seats, reservedSeats);
  const formattedSeats = segmentSeats(seats);
  if (!seats || !airplane_code || airplane_code.length === 0) {
    console.log("not hi");
    res.status(500);
  } else {
    res.status(200).json({
      seats: formattedSeats,
      airplane_code: airplane_code[0].airplane_code,
    });
  }
});

function compactData(seats, reservedSeats) {
  for (let i = 0; i < seats.length; i++) {
    const found = reservedSeats.find((seat) => seat === seats[i].seat_number);
    if (found) {
      seats[i].is_reserved = true;
    } else {
      seats[i].is_reserved = false;
    }
  }
  return seats;
}

function segmentSeats(seats) {
  let formattedSeats = [];
  for (let i = 0; i < seats.length; i += 4) {
    let row = seats.slice(i, Math.min(i + 4, seats.length));
    formattedSeats.push(row);
  }
  return formattedSeats;
}

module.exports = router;
