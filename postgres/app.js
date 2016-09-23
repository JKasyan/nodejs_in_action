/**
 * Created by kasyan on 9/23/16.
 */
var pg = require('pg');
var fs = require('fs');

fs.stat('private', function(err) {
    if(err) throw 'File "private" not exists!';
    fs.readFile('private','utf8', function(err, data){
        if(err) throw err;
        if(!data) throw 'File "Private" is empty'
        var url = parseDataToURL(data);
        var client = new pg.Client(url);
        client.connect();

        var query = client.query('SELECT count(*) FROM author');

        query.on('row', function(row){
            console.log('count = ' + row.count);
        });

        query.on('end', function() {
            console.log('end');
            client.end();
        });
    })
});


function parseDataToURL(data) {
    var dbData = JSON.parse(data);
    console.log('dbData = ', dbData);
    var url = 'tcp://' + dbData.user + ':' + dbData.password + '@' + dbData.host + ':' + dbData.port + '/' + dbData.database;
    url += '?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
    return url;
}