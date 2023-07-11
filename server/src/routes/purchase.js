var express = require("express");
const authToken = require("../middlewares/AuthToken");
const { getPurchases } = require("../database/queries/queries");
var router = express.Router();

router.get("/", authToken, async function (req, res, next) {
  try {
    const purchase = await getPurchases(req.user.user_id);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(404).json({ message: "error has occured." });
  }
});

module.exports = router;
