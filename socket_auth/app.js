/**
 * Created by kasyan on 10/5/16.
 */
var express = require('express');
var app = express();
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.listen(3001);
//
var io = require('socket.io')(3003);
var socketAuth = require('socketio-auth');
//
var users = {};
users['Evgen'] = '1234567';
//
io.on('connect', function(socket){
    console.log('Connected!');
    //
    socket.on('msg', function(data){
        console.log('msg = ', data);
    });
});
//
socketAuth(io, {
    authenticate: function (socket, data, callback) {
        console.log('authenticate');
        //get credentials sent by the client
        var username = data.username;
        //var password = data.password;
        var password = users[username];
        return callback(null, password == data.password);
    },
    postAuthenticate: function(socket, data) {
        console.log('postAuthenticate');
        socket.client.user = data.username;
    },
    timeout: 1000
});