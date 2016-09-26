/**
 * Created by kasyan on 9/24/16.
 */
var redis = require('redis');
var client = redis.createClient(6379, 'localhost');

client.on('error', function(err) {
    console.log(err);
});

/**
 * Set key
 */
client.set('mykey', 'some_value', redis.print);

client.get('mykey', function(err, value) {
    if(err) throw err;
    console.log('get = ' + value);
});

/**
 * Increment
 */
client.incr('counter', function(err, reply) {
    if(err) throw err;
    console.log('incr = ' + reply);
});

/**
 * Increment by
 */
client.incrby('counter', 3, function(err, reply) {
    if(err) throw err;
    console.log('incrby = ' + reply);
});

client.getset('getset',1, function(err, res) {
    if(err) throw err;
    console.log('getset = ', res);
});

/**
 * #################
 * Lists
 * #################
 */

client.lpush('mylist', 'first', function(err, res) {
    console.log('res = ' + res);
});

client.lpush('mylist', [1,new Date(),{A:'Letter A', B:'Letter B'}], function(err, res) {
    console.log('res = ' + res);
});

client.llen('mylist', function(err, length) {
    if(err) throw err;
    console.log('length = ' + length);
});

client.lrange('mylist', 0, -1, function(err, list) {
    if(err) throw err;
    list.forEach(function(x, i) {
        console.log(i + ' = ' + x);
    });
});

client.lpop('mylist', function(err, res) {
    if(err) throw err;
    console.log('lpop = ' + res);
});

client.rpop('mylist', function(err, res) {
    if(err) throw err;
    console.log('rpop = ' + res);
});


/**
 * Delete list
 */

client.del('mylist', function(err){
    if(err) throw err;
    console.log('mylist was deleted...')
});

/**
 *
 * #####################
 * Hashes
 * #####################
 *
 */

client.hmset('user:1000', 'username', 'Evgen', 'age', 30, function(err, res) {
    if(err) throw err;
    console.log('Added hash = ' + res)
});

client.hgetall('user:1000', function(err, res) {
    if(err) throw err;
    for(var key in res) console.log(key + ' = ' + res[key]);
});
client.quit();