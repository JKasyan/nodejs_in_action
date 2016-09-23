/**
 * Created by 1 on 9/23/2016.
 */
var mongoose = require('mongoose');
var fs = require('fs');

fs.readFile('private','utf8', function (err, data) {
    console.log(data);
    if(err) throw err;
    var db = mongoose.connect(data);

    var Schema = mongoose.Schema;
    var Point = new Schema({
        lat:Number,
        lng:Number
    });
    mongoose.model('Point', Point);
    var user = mongoose.model('Point');
    user.find({}).exec(function (err, result) {
        if(err) throw err;
        console.log(result);
        mongoose.disconnect();
    });

});

