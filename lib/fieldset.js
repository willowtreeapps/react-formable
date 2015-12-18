'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersCloneChildren = require('./helpers/cloneChildren');

var _helpersCloneChildren2 = _interopRequireDefault(_helpersCloneChildren);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

var _helpersIdentity = require('./helpers/identity');

var _helpersIdentity2 = _interopRequireDefault(_helpersIdentity);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

exports['default'] = _react2['default'].createClass({
    displayName: 'Fieldset',

    propTypes: {
        errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        fieldErrors: _react.PropTypes.object,
        name: _react.PropTypes.string.isRequired,
        children: _react.PropTypes.node
    },

    getInputs: function getInputs() {
        return {
            ref: this,
            refs: (0, _helpersValues2['default'])(this.refs || {}).filter(function (ref) {
                return ref.getInputs || ref.getValue;
            }).map(function (ref) {
                return ref.getInputs ? ref.getInputs() : { ref: ref };
            }).reduce(function (memo, node) {
                memo[node.ref.props.name] = node;
                return memo;
            }, {})
        };
    },

    render: function render() {
        var _this = this;

        (0, _warning2['default'])(this.props.name, 'Fieldset found without a name prop. The children of this component will behave eratically');

        var fieldErrors = this.props.fieldErrors || {};
        var childNames = [];

        var clonePred = function clonePred(child) {
            return child.props && child.props.name || child.type.displayName === 'Errors';
        };
        var cloneProps = function cloneProps(child) {
            if (child.type.displayName === 'Errors') {
                return {
                    errors: _this.props.errors,
                    fieldErrors: _this.props.fieldErrors || {}
                };
            }

            (0, _warning2['default'])(!child.ref, 'Attempting to attach ref "' + child.ref + '" to "' + child.props.name + '" will be bad for your health');
            (0, _warning2['default'])(childNames.indexOf(child.props.name) === -1, 'Duplicate name "' + child.props.name + '" found. Duplicate fields will be ignored');
            childNames = childNames.concat(child.props.name);

            return {
                ref: child.ref || child.props.name,
                errors: _this.props.errors,
                fieldErrors: child.props.fieldErrors || fieldErrors[child.props.name],
                onChange: child.props.onChange || _helpersIdentity2['default'],
                onSubmit: child.props.onSubmit || _helpersIdentity2['default']
            };
        };

        return _react2['default'].createElement(
            'div',
            this.props,
            (0, _helpersCloneChildren2['default'])(clonePred, cloneProps, this.props.children)
        );
    }
});
module.exports = exports['default'];