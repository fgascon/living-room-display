var http = require('http'),
	path = require('path'),
	express = require('express');

var app = express(),
	server = http.createServer(app);

exports.listen = function(port){
	server.listen(port);
};

app.configure(function(){
	app.use(express.static(path.join(__dirname, '..', 'public')));
});