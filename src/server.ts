const app = require('./app');
const http = require('http');
const opn = require('opn');
const _models = require("./models")
var port: any;

http.createServer(app).listen(8080, function() {
  port = this.address().port;
  console.log("App listens on port: " + port);
  if (process.argv[2] === 'DEBUG') {
    console.log("server started in debugmode:")
    debugMode();
  }
});


function debugMode() {
  opn('http://localhost:' + port + '/kaesekaestchen');

  //create database tables if not exist
  _models.sequelize.sync().then(function() {
    //creating mockdata:
    _models.User.bulkCreate([{
      username: "StarAppeal_mocked",
      email: "mocked@starappeal.de",
      pass: "justARandomString...",
      profilePic: 'god.png'
    }, {
      username: 'tsomic_mocked',
      email: 'mocked@tsomic.de',
      pass: 'bigChungus420blazeit',
      profilePic: 'BigChungus.jpg'
    }]);

    _models.Sheet.bulkCreate([{
      userId: 1,
      archived: false
    }, {
      userId: 1,
      archived: true
    }, {
      userId: 2,
      archived: true
    }, {
      userId: 2,
      archived: true
    }, {
      userId: 3, //should fail
      archived: false
    }]);

  });
}
