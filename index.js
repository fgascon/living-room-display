var server = require('./lib/server');

server.listen(process.argv[2] || 3000);