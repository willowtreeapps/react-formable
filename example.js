require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormable = require('react-formable');

var _reactFormable2 = _interopRequireDefault(_reactFormable);

exports['default'] = _react2['default'].createClass({
    displayName: 'app',

    render: function render() {
        return _react2['default'].createElement(
            _reactFormable2['default'],
            null,
            _react2['default'].createElement(
                'h1',
                null,
                'Look Ma, Forms!'
            ),
            _react2['default'].createElement(_reactFormable.Input, { name: 'name', type: 'text' }),
            _react2['default'].createElement(_reactFormable.Input, { name: 'ne', type: 'text' }),
            _react2['default'].createElement(_reactFormable.Input, { name: 'nes', type: 'text' })
        );
    }
});
module.exports = exports['default'];

},{"react":undefined,"react-formable":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _history = require('history');

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var history = (0, _history.useBasename)(_history.createHistory)({
    basename: '/react-formable'
});

(0, _reactDom.render)(_react2['default'].createElement(
    _reactRouter.Router,
    { history: history },
    _routes2['default']
), document.getElementById('app'));

},{"./routes":3,"history":undefined,"react":undefined,"react-dom":undefined,"react-router":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _componentsApp = require('./components/app');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

exports['default'] = _react2['default'].createElement(_reactRouter.Route, { path: '/', component: _componentsApp2['default'] });
module.exports = exports['default'];

},{"./components/app":1,"react":undefined,"react-router":undefined}]},{},[2]);
