'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var env = process.env;

var nodeEnv = exports.nodeEnv = env.NODE_ENV || 'developement';

exports.default = {
    port: env.PORT || '3032',
    host: env.HOST || '127.0.0.1',
    get serverUrl() {
        return 'http://' + this.host + ':' + this.port;
    }
};