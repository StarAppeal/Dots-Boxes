const app = require('./app');
const http = require('http');
const opn = require('opn');
const _models = require("./models");
var port;
http.createServer(app).listen(process.env.PORT, function () {
    port = this.address().port;
    console.log("App listens on port: " + port);
    if (process.argv[2] === 'DEBUG') {
        debugMode();
    }
});
function debugMode() {
    opn('http://localhost:' + port + '/kaesekaestchen');
    //create database tables if not exist
    _models.sequelize.sync().then(function () {
        //creating mockdata:
        _models.User.create({
            username: "StarAppeal_mocked",
            email: "nocked@starappeal.de",
            pass: "justARandomString..."
        });
    });
}
