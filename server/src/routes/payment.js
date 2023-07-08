const express = require("express");
const authToken = require("../middlewares/AuthToken");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:3001/purchase",
      cancel_url: "http://localhost:3001/cancel",
      line_items: req.body.seats.map((seat) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: seat.seat_number,
            },
            unit_amount: 1000,
          },
          quantity: 1,
        };
      }),
    });
    res.json({ url: session.url });
  } catch (error) {
    console.eror(error.message);
  }
});

module.exports = router;
