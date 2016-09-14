/**
 * Created by kasyan on 9/4/16.
 */
function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket) {
    const message = $('#send-message').val();
    var systemMessage;
    if(message.charAt(0) == '/') {
        systemMessage = chatApp.proccessCommand(message);
        if(systemMessage) {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    } else {
        chatApp.sendMessage($('#room').text(), message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');
}

var socket = io.connect();

$(document).ready(function() {
    const app = new Chat(socket);
    console.log(app);

    socket.on('nameResult', function(result){
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Room changed.'));
    });

    socket.on('message', function (message) {
        var newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });

    socket.on('rooms', function(rooms) {
        $('#room-list').empty();
        for(var room in rooms) {
            room = room.substr(1, room.length);
            if(room != '') {
                $('#room-list').append(divEscapedContentElement(room));
            }
        }

        $('#room-list div').click(function() {
            app.processCommand('/join ' + $(this).text());
            $('#send-message').focus();
        });
    });

    setInterval(function() {
        socket.emit('rooms');
    }, 1000);

    $('#send-message').focus();

    $('#send-form').submit(function() {
        processUserInput(app, socket);
        return false;
    });
});