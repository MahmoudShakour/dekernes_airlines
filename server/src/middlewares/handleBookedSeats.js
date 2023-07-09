const { getReservedSeatsByFlight } = require("../database/queries/queries");

const handleBookedSeats = async (req, res, next) => {
    const reservedSeats = await getReservedSeatsByFlight (req.body.flight_number);
    if (reserveTakenseats (req.body.seats, reservedSeats)) {
        res.status(403).json({ message: "you can not reserve taken seats." });
        return;
    }
    next();
};

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

module.exports = handleBookedSeats;