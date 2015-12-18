'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersIdentity = require('./helpers/identity');

var _helpersIdentity2 = _interopRequireDefault(_helpersIdentity);

var _helpersFlatten = require('./helpers/flatten');

var _helpersFlatten2 = _interopRequireDefault(_helpersFlatten);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

exports['default'] = _react2['default'].createClass({
    displayName: 'Errors',

    propTypes: {
        errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        fieldErrors: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
        additionalErrors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        scoped: _react.PropTypes.bool,
        renderError: _react.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            errors: [],
            additionalErrors: [],
            fieldErrors: [],
            scoped: false,
            renderError: _helpersIdentity2['default']
        };
    },

    render: function render() {
        var _this = this;

        var _props = this.props;
        var errors = _props.errors;
        var additionalErrors = _props.additionalErrors;
        var scoped = _props.scoped;

        var fieldErrors = (0, _helpersFlatten2['default'])((0, _helpersValues2['default'])(this.props.fieldErrors)).filter(function (s) {
            return typeof s === 'string';
        });

        var allErrors = [].concat(scoped ? fieldErrors : errors).concat(additionalErrors);

        return _react2['default'].createElement(
            'ul',
            _extends({ className: 'errors' }, this.props),
            allErrors.map(function (error, i) {
                return _react2['default'].createElement(
                    'li',
                    { key: i },
                    ' ',
                    _this.props.renderError(error),
                    ' '
                );
            })
        );
    }
});
module.exports = exports['default'];