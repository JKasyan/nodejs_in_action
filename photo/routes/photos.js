/**
 * Created by kasyan on 10/1/16.
 */

var photos = [];
photos.push({
    name: 'node.js logo',
    path:'https://nodejs.org/static/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'https://nodejs.org/static/legacy/images/ryan-speaker.jpg'
});

exports.list = function(req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
}