/**
 * Created by 1 on 9/28/2016.
 */
exports.errorHandler = function() {
    var env = process.env.NODE_ENV || 'development';
    return function (err, req, res, next) {
        console.log('Error');
        res.statusCode = 500;
        switch (env) {
            case 'development':
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                break;
            default:
                res.end('Server error');
        }
    }
}