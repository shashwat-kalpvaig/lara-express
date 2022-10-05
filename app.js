var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// require and load .env
require('dotenv').config();

var app = express();

//whitelist cors url
var corsOptions = {
  origin : process.env.WEB_URL
}
app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'jade');

// Routes
const webRoute = require("./routes/web");
const apiRoute = require("./routes/api");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//initialize database
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

//sync database --disable this settings in production
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});  

// Route Middlewares
app.use("/", webRoute);
app.use("/api", apiRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;