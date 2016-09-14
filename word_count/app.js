/**
 * Created by kasyan on 9/14/16.
 */
var fs = require('fs');
var tasks = [];
var completedTasks = 0;
var wordCount  = {};
var filesDir = './words';

function checkIfComplete() {
    completedTasks++;
    if(completedTasks == tasks.length) {
        for(var i in wordCount) {
            console.log(i + ' = ' + wordCount[i]);
        }
    }
}

function countWordsInText(text) {
    var words = text
        .toString()
        .toLowerCase()
        .split(/\W/)
        .sort();
    console.log(words.length);
    for(var index in words) {
        var word = words[index];
        if(word) {
            wordCount[word] = (wordCount[word] ? wordCount[word] + 1 : 1);
        }
    }
}

fs.readdir(filesDir, function(err, files) {
    if(err) throw err;
    for(var index in files) {
        var task = (function(file) {
            return function(){
                fs.readFile(file, function(err, text){
                    countWordsInText(text);
                    checkIfComplete();
                })
            }
        })(filesDir + '/' + files[index]);
        tasks.push(task);
    }
    for(var i in tasks) {
        tasks[i]();
    }
});