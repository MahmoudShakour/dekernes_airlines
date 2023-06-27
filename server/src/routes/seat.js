var express = require("express");
const authToken = require("../middlewares/AuthToken");
const {
  getSeatsByFlight,
  getReservedSeatsByFlight,
  reserveSeats,
  initializePurchase,
} = require("../database/queries/queries");
var router = express.Router();

router.get("/:flightId", authToken, async function (req, res, next) {
  const [seats, reservedSeats] = await Promise.all[
    (getSeatsByFlight([req.params.flightId]),
    getReservedSeatsByFlight(req.params.flightId))
  ];
  res.status(200).json({ seats, reservedSeats });
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
  // console.log(firstSeats);
  // console.log(secondSeats);
  for (let i = 0; i < firstSeats.length; i++) {
    for (let j = 0; j < secondSeats.length; j++) {
      if (firstSeats[i] === secondSeats[j].seat_number) {
        return true;
      }
    }
  }
  return false;
}

module.exports = router;
