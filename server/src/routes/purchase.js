var express = require("express");
const authToken = require("../middlewares/AuthToken");
const { getPurchases, getOnePurchase } = require("../database/queries/queries");
var router = express.Router();

router.get("/", authToken, async function (req, res, next) {
  const purchases = await getPurchases(req.user.user_id);
  res.status(200).json(purchases);
});

router.get("/:purchase_id", authToken, async function (req, res, next) {
  const purchase = await getOnePurchase(
    req.user.user_id,
    req.params.purchase_id
  );
  if (purchase === null) {
    res.status(404).json({ message: "purchase id is not valid" });
  } else if (purchase === false) {
    res.status(403).json({ message: "not authorized to view purchase info" });
  } else {
    res.status(200).json(purchase);
  }
});

module.exports = router;
