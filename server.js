"use strict";

require('babel-register');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serverRender = require('./serverRender');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

server.set('view engine', 'ejs');

server.get(['/', '/cartfarm', '/poolfarm', '/farmerbank'], function (req, res) {
    var url = req.url;
    res.render('index', {
        initialMarkup: (0, _serverRender.serverRender)(url)
    });
});

server.use(_express2.default.static('public'));

server.listen(_config2.default.port, _config2.default.host, function () {
    console.info('Express listening on port ', _config2.default.port);
});