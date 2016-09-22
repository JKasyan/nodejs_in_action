/**
 * Created by 1 on 9/22/2016.
 */
var qs = require('querystring');

exports.sendHtml = function (res, html) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

exports.parseReceivedData = function (req, callback) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){
        body += chunk;
    });
    req.on('end', function(){
        var data = qs.parse(body);
        callback(data);
    });
}

exports.actionForm = function (id, path, label) {
    var html = '<form method="post" action="' + path + '">'
        + '<input type="hidden" value="' + id + '">'
        + '<input type="submit" value="' + label + '">';
        + '</form>';
    return html;
}

exports.add = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query(
            'INSERT INTO work (hours, date, description)'
            + ' VALUES(?,?,?)',
            [work.hours, work.date, work.description],
            function (err) {
                if(err) throw err;
                exports.show(db, res);
            }
        )
    })
}

exports.delete = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query(
            'DELETE FROM work WHERE id=?',
            [work.id],
            function (err) {
                if(err) throw err;
                exports.show(db, res);
            }
        )
    })
}

exports.archive = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query(
            'UPDATE work SET archived = 1 WHERE id=?',
            [work.id],
            function (err) {
                if(err) throw err;
                exports.show(db, res);
            }
        )
    })
}