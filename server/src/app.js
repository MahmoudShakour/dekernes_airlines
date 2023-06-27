var createError = require('http-errors');
var express = require('express');
var path = require('path');
var query=require('./database/queries/execute_query');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var flightRouter = require('./routes/flight');
const { isUserExists } = require('./database/queries/queries');

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/' ,indexRouter);
app.use('/', usersRouter);
app.use('/flight', flightRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
