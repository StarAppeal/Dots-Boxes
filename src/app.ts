var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var rest = require("./routes/rest/rest");

var application = express();

// uncomment after placing your favicon in /public
application.get("/favicon.ico", (req, res) => res.status(204));
application.use(logger("dev"));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));
application.use(cookieParser());

application.use("/rest", rest);

// catch 404 and forward to error handler
application.use(function (req, res, next) {
  var err = new Error("Not Found");
  // err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (application.get("env") === "development") {
  application.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
application.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = application;
