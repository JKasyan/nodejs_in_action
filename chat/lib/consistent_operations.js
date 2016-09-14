/**
 * Created by kasyan on 9/12/16.
 */
var flow = require('nimble');

function square(digit) {
    return digit * digit;
}

function cub(digit) {
    return square(digit) * digit;
}

flow.series()

