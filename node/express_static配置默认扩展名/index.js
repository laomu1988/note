var express = require('express');

var app = new express();


app.use('/', express.static(__dirname + '/test/', {extensions: ['html','json']}));


app.listen(3000, function (err) {
    if (!err) {
        console.log('start server at http://localhost:3000');
    } else {
        throw err;
    }
});