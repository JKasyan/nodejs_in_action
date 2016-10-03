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

client.hmset('user:1001', {age:31, name:'Anton'}, function(err, res){
    if(err) throw err;
    console.log('Added hash = ' + res)
});

client.hincrby('user:1001', 'age', 2, function(err, res) {
    if(err) throw err;
    console.log('Incremented 1 = ' + res)
});

client.hgetall('user:1001', function(err, res) {
    if(err) throw err;
    for(var key in res) console.log(key + ' = ' + res[key]);
});

/**
 * ##############
 * Sets
 * ##############
 */

client.sadd('myset', arrayGen(-100, 100), function(err, res) {
    if(err) throw err;
    console.log(res);
});

function arrayGen(a,b/*array*/) {
    var arr = arguments[2] || [];
    while(a < b) {
        arr.push(a++);
    }
    return arr;
}

/**
 * ############
 * Sorted set
 * ############
 */
client.zadd('my_sorted_set', 1998, 'Sasha', function(err, res) {
    if(err) throw err;
    console.log('Added = ' + res);
});

client.zadd('my_sorted_set', 1986, 'Evgen', function(err, res) {
    if(err) throw err;
    console.log('Added = ' + res);
});

client.zadd('my_sorted_set', 1989, 'Vika', function(err, res) {
    if(err) throw err;
    console.log('Added = ' + res);
});

client.zrange('my_sorted_set', 0, -1, function(err, res) {
    if(err) throw err;
    console.log('Members of sorted set = ' + res);
});

client.zrangebyscore('my_sorted_set', 1980, 1990, function(err, res) {
    if(err) throw err;
    console.log(res);
});

client.quit();