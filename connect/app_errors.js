/**
 * Created by 1 on 9/28/2016.
 */
var connect = require('connect');
var errorHandler = require('./libs/handlers');

connect()
    .use(function (req, res) {
        foo();
        res.setHeader('Content-Type', 'text/plain');
        res.end('hello');
    })
    .use(errorHandler['errorHandler']())
    .listen(3000);

