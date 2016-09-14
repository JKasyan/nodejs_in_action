/**
 * Created by kasyan on 9/13/16.
 */
const fs = require('fs');
const request = require('request');
const htmlParser = require('htmlparser');
const configFileName = './file';

function checkForFile() {
    fs.exists(configFileName, function(exists) {
        if(!exists) next(new Error('Missing file = ' + configFileName));
        next(null, configFileName);
    })
}

function readFile(configFileName) {
    fs.readFile(configFileName, function(err, list) {
        if(err) return next(err);
        list = list
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split('\n');
        var random = Math.floor(Math.random() * list.length);
        var randomUrl = list[random];
        next(null, randomUrl);
    });
}

function downloadRssFeed(url) {
    request({url:url}, function(err, res, body) {
        if(err) return next(err);
        if(res.statusCode != 200) return next(new Error('Response'));
        next(null, body);
    })
}

function parseRssFeed(body) {
    var handler = new htmlParser.RssHandler();
    var parser = new htmlParser.Parser(handler);
    parser.parseComplete(body);
    if(!handler.dom.items.length) return next(new Error('Empty body'));
    var item = handler.dom.items.shift();
    console.log(item.title);
    console.log(item.link);
}

var tasks = [checkForFile, readFile, downloadRssFeed, parseRssFeed];

function next(error, result) {
    if(error) throw new Error(error);
    const currentTask = tasks.shift();
    if(currentTask) {
        currentTask(result);
    }
}

next();