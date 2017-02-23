/**
 * @file simple web server
 * @author lanmingming
 */
const http = require('http');
const compose = require('./lib/compose');
const Request = require('./lib/request');
const Response = require('./lib/response');

class M {

    constructor() {
        this.env = process.env.NODE_ENV || 'development';
        this.middlewares = [];
    }

    listen(...args) {
        let server = http.createServer(this.createHttpHandle());
        return server.listen.apply(server, args);
    }

    use(middleware) {
        if (!Array.isArray(middleware)) {
            middleware = [middleware];
        }
        this.middlewares = this.middlewares.concat(middleware);
    }

    createHttpHandle() {
        let composeMiddleWares = compose(this.middlewares);
        return (req, res) => {
            let request = new Request(req);
            let response = new Response(res);
            composeMiddleWares(req, res);
        };
    }

}

module.exports = M;
