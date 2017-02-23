/**
 * @file static
 * @author lanmingming
 */
const utils = require('./utils');
const mine = require('mime');
const url = require('url');
const join = require('path').join;
const fs = require('fs');

module.exports = function staticReSource(root, options = {}) {

    if (typeof root !== 'string') {
        throw new Error('root path required');
    }

    options.root = root;

    return (req, res, next) => send(req, res, next, options);
};

function forbidden(res) {
    let body = 'forbidden';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.statusCode = 403;
    res.end(body);
}

function send(req, res, next, options) {
    let method = req.method;
    let pathname = url.parse(req.url).pathname;
    let mineType = mine.lookup(pathname);

    if (method !== 'GET' && method !== 'HEAD') {
        return next();
    }
    let path = join(options.root, pathname);
    if (path.indexOf('..') >= 0) {
        return forbidden(res);
    }

    if (path[path.length - 1] === '/') {
        path = join(path, 'index.html');
    }
    fs.lstat(path, (err, stat) => {

        if (err) {
            // no such file or directory
            return err.code === 'ENOENT' ? next() : next(err);
        }

        let stream = null;
        let ranges = null;

        if (ranges = utils.parseRange(stat.size, req.headers.range)) {
            let {start, end} = ranges;

            stream = fs.createReadStream(path, ranges);
            res.setHeader('Content-Range', `bytes=${start}-${end}/${stat.size}`);
        }
        else {
            res.setHeader('Etag', utils.etag(stat));
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Range', 'bytes');

            stream = fs.createReadStream(path);
        }
        res.setHeader('Content-Type', mineType);
        res.setHeader('Accept-Range', 'bytes');

        if (method === 'HEAD') {
            res.end();
        }

        stream.pipe(res);
    });

}
