var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("static")).listen(8080);