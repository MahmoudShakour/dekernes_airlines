var express = require("express");
const authToken = require("../middlewares/AuthToken");
const { filterFlights } = require("../database/queries/queries");
var router = express.Router();

router.post("/", authToken, async function (req, res, next) {
  try {
    const filteredFlights = await filterFlights([
      req.body.from,
      req.body.to,
      req.body.beginDate,
      req.body.endDate,
    ]);
    console.log("hi");
    console.log(filteredFlights);
    res.status(200).json(filteredFlights);
  } catch (e) {
    res.status(404).json({ message: "error!" });
  }
});

module.exports = router;
