const app = require('./app');
const http = require('http');
const open = require('open');
var server;
var port;

server = http.createServer(app).listen(process.env.PORT, function() {
	port = this.address().port;
	console.log("App listens on port: " + port);
	open('http://localhost:'+port+'/kaesekaestchen');
});