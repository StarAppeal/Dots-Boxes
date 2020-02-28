const app = require('./app');
const http = require('http');
const opn = require('opn');
var port;

http.createServer(app).listen(process.env.PORT, function() {
	port = this.address().port;
	console.log("App listens on port: " + port);
	opn('http://localhost:'+port+'/kaesekaestchen');
});