'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersKeys = require('./helpers/keys');

var _helpersKeys2 = _interopRequireDefault(_helpersKeys);

var _helpersUniq = require('./helpers/uniq');

var _helpersUniq2 = _interopRequireDefault(_helpersUniq);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

var _helpersIdentity = require('./helpers/identity');

var _helpersIdentity2 = _interopRequireDefault(_helpersIdentity);

var _helpersCloneChildren = require('./helpers/cloneChildren');

var _helpersCloneChildren2 = _interopRequireDefault(_helpersCloneChildren);

var _helpersPick = require('./helpers/pick');

var _helpersPick2 = _interopRequireDefault(_helpersPick);

var _helpersOmit = require('./helpers/omit');

var _helpersOmit2 = _interopRequireDefault(_helpersOmit);

var _helpersCompose = require('./helpers/compose');

var _helpersCompose2 = _interopRequireDefault(_helpersCompose);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var getBlankForm = function getBlankForm() {
    return {
        valid: true,
        fieldValues: {},
        fieldErrors: {},
        errors: []
    };
};

exports.getBlankForm = getBlankForm;
var deNestErrors = function deNestErrors(_x) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
        var errors = _x;
        _again = false;

        // Our base case, strings or nulls
        if (!errors || typeof errors === 'string') return errors;

        // Arrays are objects, so we have to check arrays first
        // Iterate over each value in our array and denest it. Combine all These
        // results into one array and return it
        if (errors.constructor === Array) return [].concat.apply([], errors.map(function (val) {
            return deNestErrors(val);
        }));

        // Iterate over each value within our object and denest them
        if (typeof errors === 'object') {
            _arguments = [_x = (0, _helpersValues2['default'])(errors)];
            _again = true;
            continue _function;
        }

        // Fallback in case something real weird happens
        return errors;
    }
};

exports.deNestErrors = deNestErrors;
var nodeToValues = function nodeToValues(node) {
    // Whoops, bad things happening
    if (!node) return node;

    // We are either starting off or not at a leaf yet. Regardless traverse
    // the path downwards until we hit a leaf
    if (node.constructor === Array) {
        return node.reduce(function (memo, currentNode) {
            memo[currentNode.ref.props.name] = nodeToValues(currentNode);
            return memo;
        }, {});
    }

    if (node.refs && node.refs.constructor === Array) {
        return node.refs.map(function (r) {
            return nodeToValues(r);
        });
    }

    if (node.refs && typeof node.refs === 'object') {
        return (0, _helpersValues2['default'])(node.refs).reduce(function (memo, currentNode) {
            memo[currentNode.ref.props.name] = nodeToValues(currentNode);
            return memo;
        }, {});
    }

    // We are at a leaf, give our value back
    return node.ref.getValue();
};

// node: The current node we are looking at { ref: Object, refs?: Object|Array }
// treeValues: The current value / object in the tree
// treeErrors: The current array of errors / object of errors in the tree
// form: The overall form
// returns { fieldErrors: Object, errors: array }
var toErrors = function toErrors(node, treeValues, treeErrors, form) {
    if (treeErrors === undefined) treeErrors = {};

    // Something bad is happening here
    if (!node) return node;

    // The initial call to this function is an array of nodes
    if (node.constructor === Array) {
        var _ret = (function () {
            var errors = [];

            var fieldErrors = node.reduce(function (memo, currentNode) {
                var name = currentNode.ref.props.name;
                var childResult = toErrors(currentNode, treeValues[name], treeErrors[name], form);

                memo[name] = childResult.fieldErrors;
                errors = errors.concat(childResult.errors);
                return memo;
            }, {});

            return {
                v: { fieldErrors: fieldErrors, errors: errors }
            };
        })();

        if (typeof _ret === 'object') return _ret.v;
    }

    // We want to get errrors from the bottom up. To do this we start by always
    // getting the errors for our children first. Once we have our childrens
    // errors, we validate ourselves against our children. Lastly, we return the
    // result of these checks

    // These will be our return types:
    // fieldErrors: Object | Array (depending on the type of node.refs) If
    // node.refs doesn't exist it means we are a leaf and will have an array of
    // strings
    var fieldErrors = undefined;
    // errors: Array (always)
    var errors = [];

    // Here we have children, we are not a leaf
    if (node.refs) {
        if (node.refs.constructor === Array) {
            fieldErrors = node.refs.map(function (currentNode, i) {
                var childResult = toErrors(currentNode, treeValues[i], treeErrors[i], form);

                errors = errors.concat(childResult.errors);
                return childResult.fieldErrors;
            });
        } else {
            // Iterate over each child. And add our child errors to our errors
            fieldErrors = (0, _helpersValues2['default'])(node.refs).reduce(function (memo, currentNode) {
                var name = currentNode.ref.props.name;
                var childResult = toErrors(currentNode, treeValues[name], treeErrors[name], form);

                memo[name] = childResult.fieldErrors;
                errors = errors.concat(childResult.errors);
                return memo;
            }, {});
        }
    }

    // Get our current node's validators. They can be on props or this
    var validators = [].concat(node.ref.props.validators || [], node.ref.validators || []);
    // Validate the current node
    var validationErrors = validators.map(function (validator) {
        return validator.call(node.ref, treeValues, form.fieldValues, form.fieldErrors, treeErrors);
    }).filter(_helpersIdentity2['default']);

    errors = errors.concat(validationErrors);

    // Our field errors will either be our childrens fieldErrors (if we have
    // children) or our validation errors
    fieldErrors = fieldErrors || validationErrors;

    return { fieldErrors: fieldErrors, errors: errors };
};

exports['default'] = _react2['default'].createClass({
    displayName: 'Form',

    propTypes: {
        circular: _react.PropTypes.bool,

        // Handlers for your form callbacks. These will be called with the
        // current serialization of the form
        onSubmit: _react.PropTypes.func,
        onChange: _react.PropTypes.func,

        showErrorsOnSubmit: _react.PropTypes.bool,
        showErrorsOnChange: _react.PropTypes.bool,

        // Default React children prop
        children: _react.PropTypes.node
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: function onChange() {},
            onSubmit: function onSubmit() {},
            showErrorsOnSubmit: true,
            showErrorsOnChange: false
        };
    },

    getInitialState: function getInitialState() {
        return {
            fieldErrors: {},
            errors: []
        };
    },

    serialize: function serialize() {
        var iteration = 0;
        // TODO: Lolololol
        var refLength = 20;

        // Build the object of inputs
        var nodes = (0, _helpersValues2['default'])(this.refs || {}).filter(function (ref) {
            return ref.getInputs || ref.getValue;
        }).map(function (ref) {
            return ref.getInputs ? ref.getInputs() : { ref: ref };
        });

        var form = getBlankForm();
        var oldForm = getBlankForm();

        do {
            // Keep a copy of the previous iteration of the form so we can
            // detect if the form is stable to exit early
            oldForm = _extends({}, form);
            form.fieldValues = nodeToValues(nodes);

            var _toErrors = toErrors(nodes, form.fieldValues, form.fieldErrors, form);

            var fieldErrors = _toErrors.fieldErrors;
            var errors = _toErrors.errors;

            form.fieldErrors = fieldErrors;
            form.errors = (0, _helpersUniq2['default'])(errors);
            iteration++;
        } while (this.props.circular && iteration < refLength && JSON.stringify(form) !== JSON.stringify(oldForm));

        form.valid = !form.errors.length;

        return form;
    },

    onChange: function onChange() {
        this.props.onChange(this.serialize());
        if (this.props.showErrorsOnChange) {
            this.showFieldErrors();
        }
    },

    onSubmit: function onSubmit(event) {
        event && event.preventDefault && event.preventDefault();
        if (this.props.showErrorsOnSubmit) {
            this.showFieldErrors();
        }
        this.props.onSubmit(this.serialize());
    },

    onKeyDown: function onKeyDown(event) {
        if (event.key === 'Enter') {
            this.onSubmit(event);
        }
    },

    showFieldErrors: function showFieldErrors() {
        var _serialize = this.serialize();

        var fieldErrors = _serialize.fieldErrors;
        var errors = _serialize.errors;

        this.setState({ errors: errors, fieldErrors: fieldErrors });
        return errors;
    },

    clearFieldErrors: function clearFieldErrors() {
        this.setState({
            fieldErrors: {},
            errors: []
        });
    },

    render: function render() {
        var _this = this;

        // Define our helpers for cloneing our children
        var childNames = [];
        var clonePred = function clonePred(child) {
            return child.props && child.props.name || child.type.displayName === 'Errors';
        };
        var cloneProps = function cloneProps(child) {
            if (child.type.displayName === 'Errors') {
                return {
                    errors: _this.state.errors,
                    fieldErrors: _this.state.fieldErrors
                };
            }

            (0, _warning2['default'])(!child.ref, 'Attempting to attach ref "' + child.ref + '" to "' + child.props.name + '" will be bad for your health');
            (0, _warning2['default'])(childNames.indexOf(child.props.name) === -1, 'Duplicate name "' + child.props.name + '" found. Duplicate fields will be ignored');
            childNames = childNames.concat(child.props.name);

            return {
                ref: child.ref || child.props.name,
                onChange: (0, _helpersCompose2['default'])(child.props.onChange || _helpersIdentity2['default'], _this.onChange),
                onSubmit: (0, _helpersCompose2['default'])(child.props.onSubmit || _helpersIdentity2['default'], _this.onSubmit),
                errors: _this.state.errors,
                fieldErrors: child.props.fieldErrors || _this.state.fieldErrors[child.props.name]
            };
        };

        return _react2['default'].createElement(
            'form',
            _extends({}, this.props, {
                ref: 'form',
                onSubmit: this.onSubmit,
                onChange: function () {},
                onKeyDown: this.onKeyDown }),
            (0, _helpersCloneChildren2['default'])(clonePred, cloneProps, this.props.children)
        );
    }
});