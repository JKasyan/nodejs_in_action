/**
 * Created by 1 on 9/28/2016.
 */
function factorialCash() {
    var cash = {};
    var f = function (d) {
        if(!cash[d]) {
            if(d <= 1) {
                return 1;
            } else {
                cash[d] = (d) * f(d - 1);
            }
        }
        return cash[d];
    }
    return f;
}

function factorial(d) {
    return d <= 1 ? 1 : d * factorial(d-1);
}
console.log(factorial(100))