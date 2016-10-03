/**
 * Created by 1 on 10/3/2016.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var io = require('socket.io')(3003);

fs.readFile('private.txt', 'utf8', function (err, data) {
    console.log(data);
    if (err) throw err;
    mongoose.connect(data);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error!'));
    db.once('open', function () {
        console.log('open!');
        io.on('connect', function(socket) {
            console.log('connected!');
        })
    });
});