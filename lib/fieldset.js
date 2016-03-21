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

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _helpersTree = require('./helpers/tree');

var _helpersTree2 = _interopRequireDefault(_helpersTree);

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
            }).map(function (x) {
                return (0, _helpersTree2['default'])(x.ref, x.refs);
            }).reduce(function (memo, node) {
                memo[node.value.props.name] = node;
                return memo;
            }, {})
        };
    },

    render: function render() {
        (0, _warning2['default'])(this.props.name, 'Fieldset found without a name prop. The children of this component will behave eratically');
        var errorsRule = (0, _helpersCloneChildren.createErrorsRule)(this.props.errors, this.props.fieldErrors);
        var formableRule = (0, _helpersCloneChildren.createFormableRule)(this.props.errors, this.props.fieldErrors);

        return _react2['default'].createElement(
            'div',
            this.props,
            (0, _helpersCloneChildren2['default'])([errorsRule, formableRule], this.props.children)
        );
    }
});
module.exports = exports['default'];