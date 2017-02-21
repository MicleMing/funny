/**
 * @file compose middleware
 * @author lanmingming
 */

function compose(middlewares) {
    return (req, res) => {
        let index = 0;
        let currentMidWare = null;
        function next() {
            if (currentMidWare = middlewares[index]) {
                index++;
                currentMidWare(req, res, next);
            }
        }
        next();
    };
}

module.exports = compose;

