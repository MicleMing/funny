/**
 * @file request body parser
 * @author lanmingming
 * @desc support application/x-www-form-urlencoded & application/json
 */

const qs = require('qs');

module.exports = function bodyParser() {

    function genParser(req) {
        let contentType = req.headers['content-type'].split(';')[0];
        let parsers = {
            'application/x-www-form-urlencoded': qs.parse,
            'application/json': JSON.parse
        };
        return parsers[contentType];
    }

    return (req, res, next) => {

        let parser = genParser(req);

        if (parser && !req.body) {
            let data = '';
            req.setEncoding('utf8');
            req.on('data', chunk => data += chunk);
            req.on('end', () => {
                req.rawBody = data;
                try {
                    req.body = parser(data);
                }
                catch (err) {
                    req.body = {};
                    next(err);
                }
                next();
            });
            req.on('error', err => next(err));
        }
        else {
            next();
        }
    };
};
