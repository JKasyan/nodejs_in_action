/**
 * Created by 1 on 9/28/2016.
 */
var connect = require('connect');
var errorHandler = require('./libs/handlers');

var api = connect()
    .use(users)
    .use(pets)
    .use(errorHandler['errorHandler']());

var app = connect()
    .use(hello)
    .use('/api', api)
    .use(errorPage)
    .listen(3000);

function hello(req, res, next) {
    if(req.url.match(/\/hello/)) {
        res.end('Hello world\n');
    } else {
        next();
    }
}

var db = {
    users: [
        {name:'tobi'},
        {name:'loki'},
        {name:'jane'}
    ]
}

function users(req, res, next) {
    var match = req.url.match(/^\/user\/(.+)/);
    if(match) {
        var user = db.users[match[1]];
    }
}