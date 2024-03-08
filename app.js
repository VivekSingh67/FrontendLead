var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
// const db = require('./database');
const db = require('./config/database');
const cors = require('cors')
const session = require('express-session');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
const staticpath = path.join(__dirname,);
const templatespath = path.join(__dirname, "./templates/views");
const partialpath = path.join(__dirname, "./templates/partials");
app.use(cors());
app.set('view engine', 'hbs');
app.set("views", templatespath);
hbs.registerPartials(partialpath);
app.use(session({ secret: 'ShubhamSharma', resave: false, saveUninitialized: false, cookie: { maxAge: 60 * 60 * 1000 } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(9000, function () {
  console.log('Express server listening on port 9000');
});

module.exports = app;
