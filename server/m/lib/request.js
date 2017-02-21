/**
 * @file request
 * @author lanmingming
 */

class Request {

    constructor(req) {
        this.req = req;
    }

    get headers() {
        return this.req.headers;
    }

    get httpVersion() {
        return this.req.httpVersion;
    }

    get method() {
        return this.req.method;
    }

    get statusCode() {
        return this.req.statusCode;
    }

}

module.exports = Request;
