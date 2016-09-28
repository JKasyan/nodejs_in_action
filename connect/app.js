/**
 * Created by 1 on 9/26/2016.
 */
var connect = require('connect');
connect()
    .use(setup('GET'))
    .use('/hello', hello)
    .listen(3000);

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello!');
}

function restrict(req, res, next) {
    var authorization = req.headers.authorization;
    if(!authorization) next(new Error('Unauthorized'));
    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    next();
}

function setup(format) {
    var regexp = /:(\w+)/g;
    return function logger(req, res, next) {
        var str = format.replace(regexp, function (match, property) {
            return req[property];
        });
        console.log(str);
        next();
    }
}