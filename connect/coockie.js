/**
 * Created by 1 on 9/29/2016.
 */
var connect = require('connect');
var app = connect()
    .use(connect.bodyParser())
    .use(function (req, res) {
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello');
    })
    .listen(3000);
