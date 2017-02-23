/**
 * @file cookieParser
 * @author lanmingming
 * @desc parser request cookie to object
 */

module.exports = function cookieParser() {

    // A list of name-value pairs in the form of <cookie-name>=<cookie-value>.
    // Pairs in the list are separated by a semi-colon and a space ('; ').
    function parser(cookie) {

        let pairs = cookie.split('; ');
        let arr = null;
        let key = '';
        let val = '';

        return pairs.reduce((obj, item, index) => {
            arr = item.split('=');
            key = arr[0].trim();
            val = arr[1].trim();
            if (!obj[key]) {
                obj[key] = val;
            }
            return obj;
        }, {});
    }

    return (req, res, next) => {

        let cookieStr = req.headers.cookie;
        if (cookieStr) {
            try {
                req.cookie = parser(cookieStr);
            }
            catch (err) {
                next(err);
            }
        }
        next();
    };
};
