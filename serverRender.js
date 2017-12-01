"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serverRender = undefined;

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _history = require('./src/history');

var _history2 = _interopRequireDefault(_history);

var _server = require('react-dom/server');

var _ClientApp = require('./src/ClientApp');

var _ClientApp2 = _interopRequireDefault(_ClientApp);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouter = require('react-router');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _index = require('./src/Reducers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_index.reducer, (0, _redux.applyMiddleware)(_reduxThunk2.default));

var serverRender = function serverRender(url) {
    return (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _reactRouter.StaticRouter,
            { location: url },
            _react2.default.createElement(_ClientApp2.default, null)
        )
    ));
};

exports.serverRender = serverRender;