/**
 * Created by 1 on 9/22/2016.
 */
var http = require('http');
var work = require('./lib/timetracker');
var mysql = require('mysql');
var fs = require('fs');
var options = null;
var db = null;

var data = fs.readFileSync('private');
options = JSON.parse(data.toString());
console.log(options);
db = mysql.createConnection(options);

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            switch (req.url){
                case '/':
                    work.add(db,req, res);
                    break;
                case '/archive':
                    work.archive(db,req, res);
                    break;
                case '/delete':
                    work.delete(db,req, res);
                    break;
            }
            break;
        case 'GET':
            switch (req.url){
                case '/':
                    work.show(db, res);
                    break;
                case '/archived':
                    work.showArchived(db, res);
                    break;
            }
            break;
    }
});

console.log('db = ' + db);

db.query('CREATE TABLE IF NOT EXISTS work('
    + 'id INT(10) NOT NULL AUTO_INCREMENT,'
    + 'hours DECIMAL(5,2) DEFAULT 0,'
    + 'date DATE,'
    + 'archived INT(1) DEFAULT 0,'
    + 'description LONGTEXT,'
    + 'PRIMARY KEY(id))',
    function (err) {
        if (err) throw err;
        console.log('Server started...');
        server.listen(3000);
    }
);

