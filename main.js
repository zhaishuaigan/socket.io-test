var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var api = require('./api/index.js');
var socket = require('./socket/index.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

var config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

app.use(express.static(path.join(__dirname, 'web')));

socket.run(io, config);
api.run(app);

server.listen(config.port);
console.log('server run port: ' + config.port);

