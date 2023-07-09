const express = require("express");
const authToken = require("../middlewares/AuthToken");
const {
  getReservedSeatsByFlight,
  reserveSeats,
  initializePurchase,
  getSeatsPrice,
} = require("../database/queries/queries");
const handleBookedSeats = require("../middlewares/handleBookedSeats");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", authToken, handleBookedSeats, async (req, res) => {
  try {
    const seats=await getSeatsPrice(req.body.seats,req.body.airplane_code);
    console.log(seats);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      metadata: {
        user_id: req.user.user_id,
        airplane_code: req.body.airplane_code,
        flightId: req.body.flight_number,
      },
      line_items: seats.map((seat) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: "seat: " + seat.seat_number,
            },
            unit_amount: Number(seat.seat_price) * 100,
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

router.post("/webhook", async (req, res) => {
  try {
    const signature = req.headers["stripe-signature"];
    const webhookEvent = stripe.webhooks.constructEvent(
      req["rawBody"],
      signature,
      process.env.WEBHOOK_SECRET_KEY
    );

    if (webhookEvent.type === "checkout.session.completed") {
      const session = webhookEvent.data.object;
      const { line_items } = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items"],
        }
      );

      const seatsToBook = line_items.data
        .map((seat) => seat.description)
        .map((seat) => seat.split(" ")[1]);
      console.log(seatsToBook);
      // send user id via metadata
      console.log(session.metadata);
      const purchase = await initializePurchase(session.metadata.user_id);
      
      await reserveSeats(
        session.metadata.flightId,
        seatsToBook,
        purchase.insertId,
        session.metadata.airplane_code
      );
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

module.exports = router;
