/**
 * Created by 1 on 9/15/2016.
 */
var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    console.log('url = ',url.parse(req.url).pathname);
    switch (req.method) {
        case 'POST' :
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                console.log('chunk = ' + chunk);
                item += chunk;
            });
            req.on('end', function () {
                items.push(item);
                res.end('OK\n');
                console.log('end');
            });
            break;
        case 'GET' :
            if(path) {
                var id = parseInt(path.slice(1), 10);
                if(isNaN(id)) {
                    res.statusCode = 400;
                } else if(!items[id]) {
                    res.statusCode = 404;
                } else {
                    res.write(items[id]);
                }
            } else {
                items.forEach(function (item, i) {
                    res.write(i + ' = ' + item + '\n');
                });
            }
            res.end();
            break;
        case 'DELETE' :
            
    }
});

server.listen(3000);