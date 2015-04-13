var Hapi = require('hapi'),
    config = require('../config'),
    router = require('./routes/router');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection(config.server);

server.views({
    engines: {
        hbs: require("handlebars")
    },
    relativeTo: __dirname + '/../client/',
    path: "templates"
    //helpersPath: "helpers"
});

var io = require('socket.io')(server.listener);

router.start(server, io);

// Server the server
console.log('Starting server on localhost:8000');
server.start();

