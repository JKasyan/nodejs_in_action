/**
 * Created by 1 on 10/3/2016.
 */

var io = require('socket.io')(3003);

var express = require('express');
var app = express();

//socket -> name
var sockets = {};
var quantity = 1;

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(3000);

io.on('connect', function(socket) {

    console.log('connected!');
    console.log('sockets = ', sockets);
    var newName = 'Guest' + quantity++;
    socket.emit('newName', {name: newName});
    socket.hello = 'world';

    socket.join('generalRoom');
    socket.emit('users', sockets);
    sockets[socket.id] = newName;

    //var clients = io.sockets.adapter.rooms['generalRoom'].sockets;
    //console.log('Clients = ', clients);

    //broadcast to all
    socket.broadcast.to('generalRoom').emit('newUser', {socketId: socket.id, name: newName});
    //and to new user all users

    socket.on('msgForAll', function(data) {
        socket.to('myRoom').emit('broadcast', data);
    });

    socket.on('sendToUser', function (data) {
        console.log('sendToUser = ' + sockets[data.id] + ', message = ' + data.message);
        io.to(data.id).emit('fromUser', {message:data.message, sender:data.id});
    });

    socket.on('disconnect', function () {
        console.log('disconnect = ' + socket.id);
        delete sockets[socket.id];
        socket.broadcast.to('generalRoom').emit('disconnectUser', {socketId: socket.id});
    });
});