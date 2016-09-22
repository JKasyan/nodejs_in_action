/**
 * Created by 1 on 9/22/2016.
 */
var http = require('http');
var counter = 0;

var server = http.createServer(function(req, res){
    console.log(counter);
    counter++;
    res.end('Page will be upload ' + counter + ' time');
});

server.listen(3000);