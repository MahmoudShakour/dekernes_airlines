const express = require("express");
const authToken = require("../middlewares/AuthToken");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", authToken, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.seats.map((seat) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: "seat: " + seat,
            },
            unit_amount: 1000 * 100,
          },
          quantity: 1,
        };
      }),
      success_url: "http://localhost:3001/",
      cancel_url: "http://localhost:3001/",
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/webhook", (req, res) => {
  try {
    const signature = req.headers["stripe-signature"];
    const webhookEvent = stripe.webhooks.constructEvent(
      req["rawBody"],
      signature,
      process.env.WEBHOOK_SECRET_KEY
    );

    if (webhookEvent.type === "payment_intent.succeeded") {
      console.log("Payment succeeded!");
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

module.exports = router;
