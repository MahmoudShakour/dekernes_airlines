var express = require("express");
const authToken = require("../middlewares/AuthToken");
const {
  getSeatsByFlight,
  getReservedSeatsByFlight,
  reserveSeats,
  initializePurchase,
  getAirplaneCode,
} = require("../database/queries/queries");
var router = express.Router();

router.get("/:flightId", authToken, async function (req, res, next) {
  let [seats, reservedSeats, airplane_code] = await Promise.all([
    getSeatsByFlight([req.params.flightId]),
    getReservedSeatsByFlight(req.params.flightId),
    getAirplaneCode(req.params.flightId),
  ]);
  reservedSeats = reservedSeats.map((x) => x.seat_number);
  seats = compactData(seats, reservedSeats);
  const formattedSeats = segmentSeats(seats);
  if (!seats || !airplane_code || airplane_code.length === 0) {
    res.status(500);
  } else {
    res
      .status(200)
      .json({ seats: formattedSeats, airplane_code: airplane_code[0].airplane_code });
  }
});

router.post("/:flightId", authToken, async function (req, res, next) {
  try {
    const reservedSeats = await getReservedSeatsByFlight(req.params.flightId);

    if (reserveTakenseats(req.body.seats, reservedSeats)) {
      res.status(403).json({ message: "you can not reserve taken seats." });
      return;
    }

    const purchase = await initializePurchase(req.user.user_id);

    await reserveSeats(
      req.params.flightId,
      req.body.seats,
      purchase.insertId,
      req.body.airplane_code
    );
    res.status(200).json({ purchaseInsertId: purchase.InsertId });
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
});

function reserveTakenseats(firstSeats, secondSeats) {
  for (let i = 0; i < firstSeats.length; i++) {
    for (let j = 0; j < secondSeats.length; j++) {
      if (firstSeats[i] === secondSeats[j].seat_number) {
        return true;
      }
    }
  }
  return false;
}

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
