const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/user");
const flightRouter = require("./routes/flight");
const seatRouter = require("./routes/seat");
const purchaseRouter = require("./routes/purchase");
const paymentRouter = require("./routes/payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());

app.use(
  express.json({
    verify: (req, res, buffer) => (req.rawBody = buffer),
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", usersRouter);
app.use("/flight", flightRouter);
app.use("/seat", seatRouter);
app.use("/purchase", purchaseRouter);
app.use('/payment', paymentRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
