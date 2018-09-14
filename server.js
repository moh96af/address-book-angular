var express = require('express')
var cors = require('cors')
var path = require('path');

var app = express();
app.use(cors())

app.use('/', express.static(__dirname + '/dist/address-book-angular'));
app.use('/contacts', express.static(__dirname + '/dist/address-book-angular'));

app.all('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname));
});

app.listen(3001);
