var compose = require('server/m/lib/compose');

describe('compose', function() {
    let fn1 = function(res, res, next) {
        console.log('fn1-start');
        next();
        console.log('fn1-end');
    }
    let fn2 = function(res, res, next) {
        console.log('fn2-start');
        next();
        console.log('fn2-end');
    }
    let fn3 = function(res, res, next) {
        console.log('fn3-start');
        next();
        console.log('fn3-end');
    }
    let cm = compose([fn1, fn2, fn3]);

    it('compose', function() {

    })
})



