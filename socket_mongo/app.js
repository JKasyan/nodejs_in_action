/**
 * Created by 1 on 10/3/2016.
 */

var fs = require('fs');
var io = require('socket.io')(3003);

var express = require('express');
var app = express();

var s = new Set();

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(3000);

io.on('connect', function(socket) {

    console.log('connected!');

    socket.join('generalRoom');

    //broadcast.to(room).emit
    socket.broadcast.to('generalRoom').emit('newUser', {socketId: socket.id});

    socket.on('msgForAll', function(data) {
        socket.to('myRoom').emit('broadcast', data);
    });

    socket.on('sendToUser', function (data) {
        console.log('sendToUser = ' + data.id + ', message = ' + data.message);
        io.to(data.id).emit('fromUser', data.message);
    });
});