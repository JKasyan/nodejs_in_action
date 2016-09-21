/**
 * Created by 1 on 9/21/2016.
 */
var http = require('http');
var formidable = require('formidable');

var server = http.createServer(function(req, res){
    switch (req.method) {
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
    }
});

server.listen(3000);

function show(req, res) {
    var html = ''
        + '<form method="post" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="title"></p>'
        + '<p><input type="file" name="file"></p>'
        + '<p><input type="submit" value="Upload"></p>'
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if(!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad request');
        return;
    }
    var form = new formidable.IncomingForm();

    form.on('progress', function (received, expected) {
        console.log(Math.floor(received/expected * 100));
    });

    form.on('field', function (field, value) {
        //console.log('field = ', field, ', value = ', value);
    });

    form.on('file', function (name, file) {
        //console.log('name = ', name, ', file = ', file);
    });

    form.on('end', function () {
        console.log('Complete!');
    });
    
    form.parse(req);
}

function isFormData(req) {
    console.log(req.headers['content-type']);
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}