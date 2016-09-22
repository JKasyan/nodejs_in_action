/**
 * Created by kasyan on 9/23/16.
 */
var pg = require('pg');
var fs = require('fs');

//TODO: Read file private
var connectionString = null;
var client = new pg.Client(connectionString);
client.connect();

var query = client.query('SELECT * FROM Book');

query.on('row', function(row){
    console.log(row);
})

query.on('end', function() {
    console.log('end');
    client.end();
})