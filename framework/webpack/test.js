var url = require('url');

module.exports = function () {
    return url.parse(location.href);
};