/**
 * Created by 1 on 10/6/2016.
 */
var express = require('express');
var io = require('socket.io')(3003);
var app = express();

app.listen(3001);
//
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/data', function(req, res) {
    console.log(io.sockets.adapter.rooms[100]);
    var id = req.query.id;
    if(io.sockets.adapter.rooms[id]) {
        io.to(id).emit('msg', req.query);
    }
    res.send('ok');
});

//
io.on('connect', function (socket) {

    console.log(socket.id);

    socket.on('preferredRoom', function (room) {
        console.log('room = ', room);
        socket.join(room);
    });

});