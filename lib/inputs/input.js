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
        fieldErrors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        validateOnBlur: _react.PropTypes.bool,
        onChange: _react.PropTypes.func,
        onSubmit: _react.PropTypes.func,
        className: _react.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: identity,
            onSubmit: identity,
            className: ''
        };
    },

    getValue: function getValue() {
        return this.refs.input.value;
    },

    onChange: function onChange(e) {
        if (!this.props.validateOnBlur) {
            this.props.onChange(e);
        }
    },

    onBlur: function onBlur() {
        if (this.props.validateOnBlur) {
            this.props.onChange();
        }
    },

    render: function render() {
        var hasError = this.props.fieldErrors && this.props.fieldErrors.length;
        var className = this.props.className + ' ' + (hasError ? 'error' : '');

        return _react2['default'].createElement('input', _extends({}, this.props, {
            className: className,
            onChange: this.onChange,
            onBlur: this.onBlur,
            ref: 'input' }));
    }
});
module.exports = exports['default'];