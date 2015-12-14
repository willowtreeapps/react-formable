'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var identity = function identity(x) {
    return x;
};

exports['default'] = _react2['default'].createClass({
    displayName: 'input',

    propTypes: {
        errors: _react.PropTypes.arrayOf(_react.PropTypes.string)
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: identity,
            onSubmit: identity
        };
    },

    getValue: function getValue() {
        return this.refs.input.value;
    },

    render: function render() {
        var hasError = this.props.errors && this.props.errors.length;

        var style = {
            border: '1px solid ' + (hasError ? 'red' : 'black')
        };

        return _react2['default'].createElement('input', _extends({}, this.props, {
            ref: 'input',
            style: style }));
    }
});
module.exports = exports['default'];