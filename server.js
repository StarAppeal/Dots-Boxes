const app = require('./app');
const http = require('http');

http.createServer(app).listen(process.env.PORT, function() {
	console.log("App listens on port: " + this.address().port);
});
	