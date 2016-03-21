/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createErrorsRule = createErrorsRule;
exports.createFormableRule = createFormableRule;
exports['default'] = cloneChildren;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _identity = require('./identity');

var _identity2 = _interopRequireDefault(_identity);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

/**
 * Rule for cloning something at leaf level like some text
 */
var leafRule = {
    predicate: function predicate(child) {
        return typeof child !== 'object' || child === null;
    },
    clone: _identity2['default']
};

/**
 * Allows default recursion into an element that has children.
 *
 * @param {array} rules on how to clone individual elements
 * @returns {Object} rule for cloning recursively
 */
function createRecursiveRule(rules) {
    return {
        predicate: function predicate() {
            return true;
        },
        clone: function clone(child, childNames) {
            return _react2['default'].cloneElement(child, {}, cloneChildren(rules, child.props && child.props.children, childNames));
        }
    };
}

/**
 * A common function for cloning Errors element that takes care of injecting
 * required error data
 *
 * @param {array} errors of the form
 * @param {Object} fieldErrors of the form
 * @return {Object} rule for cloning Errors element
 */

function createErrorsRule() {
    var errors = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var fieldErrors = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return {
        predicate: function predicate(child) {
            return child.type && child.type.displayName === 'Errors';
        },
        clone: function clone(child) {
            return _react2['default'].cloneElement(child, {
                errors: errors,
                fieldErrors: fieldErrors
            }, child.props && child.props.children);
        }
    };
}

/*
 * Get extra properties for something we are going to weave our formable magic into.
 */
function getFormableComponentProperties(errors, fieldErrors, onSubmit, onChange) {
    return function (child, childNames) {
        (0, _warning2['default'])(!child.ref, 'Attempting to attach ref "' + child.ref + '" to "' + child.props.name + '" will be bad for your health');
        (0, _warning2['default'])(childNames.indexOf(child.props.name) === -1, 'Duplicate name "' + child.props.name + '" found. Duplicate fields will be ignored');
        childNames.push(child.props.name);

        return {
            ref: child.ref || child.props.name,
            onChange: (0, _compose2['default'])(onChange, child.props.onChange || _identity2['default']),
            onSubmit: (0, _compose2['default'])(onSubmit, child.props.onSubmit || _identity2['default']),
            errors: errors,
            fieldErrors: child.props.fieldErrors || fieldErrors[child.props.name]
        };
    };
}

/*
 * Standard cloning rule for something react-formable
 */

function createFormableRule() {
    var errors = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var fieldErrors = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var onSubmit = arguments.length <= 2 || arguments[2] === undefined ? _identity2['default'] : arguments[2];
    var onChange = arguments.length <= 3 || arguments[3] === undefined ? _identity2['default'] : arguments[3];

    return {
        predicate: function predicate(child) {
            return child.props && child.props.name;
        },
        clone: function clone(child, childNames) {
            return _react2['default'].cloneElement(child, getFormableComponentProperties(errors, fieldErrors, onSubmit, onChange)(child, childNames), child.props && child.props.children);
        }
    };
}

/**
 * Clones a child subtree using the supplied rules which are composed of predicates
 * and clone instructions.
 *
 * @param  {array} rules used to predicate and clone
 * @param  {Function} children The children to iterate over
 * @param  {array=} childNames optionally and ONLY supplied for internal recursion
 * @return {Object} The cloned children
 */

function cloneChildren(rules, children) {
    var childNames = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    if (children) {
        var _ret = (function () {
            var cloneRules = [leafRule].concat(_toConsumableArray(rules), [createRecursiveRule(rules)]);
            var clones = _react2['default'].Children.map(children, function (child) {
                // find first rule that passes and use it to clone
                return cloneRules.find(function (rule) {
                    return rule.predicate(child);
                }).clone(child, childNames);
            });

            return {
                v: _react2['default'].Children.count(clones) == 1 ? clones[0] : clones
            };
        })();

        if (typeof _ret === 'object') return _ret.v;
    }
}