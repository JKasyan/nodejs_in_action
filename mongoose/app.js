/**
 * Created by 1 on 9/23/2016.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var points = null;

fs.readFile('private', 'utf8', function (err, data) {
    console.log(data);
    if (err) throw err;
    mongoose.connect(data);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error!'));
    db.once('open', function () {
        console.log('Open connection...');
        var Schema = mongoose.Schema;
        var PointSchema = new Schema({
            lat: Number,
            lng: Number,
            speed: Number,
            bearing: Number,
            altitude: Number,
            batt: Number,
            _id: {
                $oid: String
            },
            id: String
        }, {collection: 'Point'});
        var point = mongoose.model('point', PointSchema);
        point.where('timestamp')
            .gt(new Date(2016, 7, 1).getTime() / 1000)
            .select('lat')
            .select('lng')
            .limit(100)
            .exec(function (err, result) {
                if (err) throw err;
                console.log('Size = ' + result.length);
                var lat, lng;
                var res = result.reduce(function (res, current) {
                    if (!lat && !lng) {
                        lat = current.lat;
                        lng = current.lng;
                        return 0;
                    }
                    var x = current.lat - lat;
                    var y = current.lng - lng;
                    lat = current.lat;
                    lng = current.lng;
                    return res + Math.sqrt(x * x + y * y);
                }, 0);
                console.log(res);
                mongoose.disconnect();
            });
    });
});

