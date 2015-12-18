'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

var _fieldset = require('./fieldset');

var _fieldset2 = _interopRequireDefault(_fieldset);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

exports['default'] = _react2['default'].createClass({
    displayName: 'Fieldlist',

    propTypes: {
        errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        fieldErrors: _react.PropTypes.arrayOf(_react.PropTypes.object),
        name: _react.PropTypes.string.isRequired,
        children: _react.PropTypes.node
    },

    getInputs: function getInputs() {
        return {
            ref: this,
            refs: (0, _helpersValues2['default'])(this.refs.fieldset.getInputs().refs).filter(function (node) {
                return node.refs && (0, _helpersValues2['default'])(node.refs).length;
            })
        };
    },

    render: function render() {
        var _this = this;

        (0, _warning2['default'])(this.props.name, 'Fieldlist found without a name prop. The children of this component will behave eratically');

        var errors = this.props.errors || [];
        var fieldErrors = this.props.fieldErrors || [];

        // Overwrite errors and fieldErrors passed in here as fieldset expects
        // different errors than fieldlist. There is no need to pass them down
        return _react2['default'].createElement(
            _fieldset2['default'],
            _extends({}, this.props, {
                ref: 'fieldset',
                errors: [],
                fieldErrors: {} }),
            _react2['default'].Children.map(this.props.children, function (child, i) {
                return _react2['default'].createElement(
                    _fieldset2['default'],
                    { name: _this.props.name + i,
                        errors: errors,
                        fieldErrors: fieldErrors[i] },
                    child
                );
            })
        );
    }
});
module.exports = exports['default'];