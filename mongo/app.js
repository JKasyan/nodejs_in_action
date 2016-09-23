/**
 * Created by 1 on 9/23/2016.
 */
var mongodb = require('mongodb');
var client = new mongodb.Db('db', new mongodb.Server('host', 'port', {}), {});


client.authenticate('name', 'password', function(err, res) {
    if(err) console.log('Error = ', err);
    console.log(res);
    client.open(function (err) {
        if(err) throw err;
        client.collection('User', function (err, collection) {
            collection.find({"email": "evgen@gmail.com"}).toArray(function (err, result) {
                if(err) throw err;
                console.log(result)
            });
        });
    });
});
