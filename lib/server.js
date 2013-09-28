var http = require('http'),
	path = require('path'),
	fs = require('fs'),
	express = require('express'),
	browserify = require('browserify');

var app = express(),
	server = http.createServer(app);

exports.listen = function(port){
	server.listen(port);
};

app.configure(function(){
	app.use(express.static(path.join(__dirname, '..', 'public')));
});

browserify(path.join(__dirname, 'client.js')).bundle().pipe(fs.createWriteStream(path.join(__dirname, '..', 'public', 'app.js')));

var PHOTOS_PATH = path.join(__dirname, '..', 'public', 'photos');

app.get('/photo/list', function(req, res){
	fs.readdir(PHOTOS_PATH, function(err, photos){
		if(err){
			res.json(500, err);
		}else{
			res.json(photos);
		}
	});
});