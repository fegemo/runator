var staticRoute = require('./static'),
    submitRoute = require('./submit'),
    indexRoute = require('./index');

module.exports = {
    start: function(server, io) {
        server.route(staticRoute);
        server.route(submitRoute(io));
        server.route(indexRoute);
    }
};