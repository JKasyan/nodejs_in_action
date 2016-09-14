/**
 * Created by kasyan on 9/5/16.
 */
var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function(socket) {
        guestNumber = assignGuestNumber(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        socket.on('rooms', function(){
            socket.emit('rooms', io.sockets.manager.rooms);
        });
        handleClientDisconnection(socket, nickNames, namesUsed);
    })
}

function assignGuestNumber(socket, guestNumber, nickNames, namesUsed){
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    console.log('Socket id = ' + socket.id);
    socket.emit('nameResult', {success:true, name:name});
    namesUsed.push(name);
    return guestNumber + 1;
}

function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room:room});
    socket.broadcast.to(room).emit('message', {text: nickNames[socket.id] + ' has been joined ' + room});
    const usersInRooms = io.sockets.clients(room);
    if(usersInRooms.length > 1) {
        var usersInRoomSummary = 'Users currently in ' + room + ': ';
        for(var index in usersInRooms) {
            var userSocketId = usersInRooms[index].id;
            if(userSocketId != socket.id) {
                if(index > 0) {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', {text:usersInRoomSummary});
    }
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('handleAttempt', function(name) {
        if(name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
                success: false,
                message: 'Names cannot begin with "Guest".'
            });
        } else {
            if (namesUsed.indexOf(name) == -1) {
                var previousName = nickNames[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult',{
                    success:true,
                    name:name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: previousName + ' is now known as ' + name + '.'
                })
            } else {
                socket.emit('nameResult',{
                    success:false,
                    message:'That name is already in use.'
                });
            }
        }
    })
}

function handleMessageBroadcasting(socket) {
    socket.on('message', function(message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}

function handleRoomJoining(socket) {
    socket.on('join', function(room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

function handleClientDisconnection(socket) {
    socket.on('disconnect', function() {
        console.log('disconnect = ', nickNames[socket.id]);
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}