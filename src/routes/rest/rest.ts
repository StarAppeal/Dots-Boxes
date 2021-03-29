var express = require('express');
var _app = express();

var users = require('./users');
var core = require("./dots-n-boxes")

_app.use("/users", users)
_app.use("/core", core);

module.exports = _app;
