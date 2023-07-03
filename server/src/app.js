var createError = require('http-errors');
var express = require('express');
const cors=require('cors');





var usersRouter = require('./routes/user');
var flightRouter = require('./routes/flight');
var seatRouter = require('./routes/seat');
var purchaseRouter = require('./routes/purchase');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter);
app.use('/flight', flightRouter);
app.use('/seat', seatRouter);
app.use('/purchase', purchaseRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});


module.exports = app;
