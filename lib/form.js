'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersUniq = require('./helpers/uniq');

var _helpersUniq2 = _interopRequireDefault(_helpersUniq);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

var _helpersCloneChildren = require('./helpers/cloneChildren');

var _helpersCloneChildren2 = _interopRequireDefault(_helpersCloneChildren);

var _helpersTree = require('./helpers/tree');

var _helpersTree2 = _interopRequireDefault(_helpersTree);

var _helpersIdentity = require('./helpers/identity');

var _helpersIdentity2 = _interopRequireDefault(_helpersIdentity);

var getBlankForm = function getBlankForm() {
    return {
        valid: true,
        fieldValues: {},
        fieldErrors: {},
        errors: []
    };
};

exports.getBlankForm = getBlankForm;
var treeValue = function treeValue(tree) {
    return tree.map(function (value) {
        return value.getValue && value.getValue();
    }).extract();
};

var getValidators = function getValidators(ref) {
    var propValidators = ref && ref.props && ref.props.validators || [];
    var refValidators = ref && ref.validators || [];

    return [].concat(propValidators, refValidators);
};

exports['default'] = _react2['default'].createClass({
    displayName: 'Form',

    propTypes: {
        addValidationFieldErrors: _react.PropTypes.bool,

        // Handlers for your form callbacks. These will be called with the
        // current serialization of the form
        onSubmit: _react.PropTypes.func,
        onChange: _react.PropTypes.func,

        showErrorsOnSubmit: _react.PropTypes.bool,
        showErrorsOnChange: _react.PropTypes.bool,

        validators: _react.PropTypes.arrayOf(_react.PropTypes.func),

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
        var _this = this;

        // Build our list of children
        var refs = (0, _helpersValues2['default'])(this.refs || {}).filter(function (ref) {
            return ref.getInputs || ref.getValue;
        }).map(function (ref) {
            return ref.getInputs ? ref.getInputs() : { ref: ref };
        }).map(function (x) {
            return (0, _helpersTree2['default'])(x.ref, x.refs);
        }).reduce(function (memo, node) {
            memo[node.value.props.name] = node;
            return memo;
        }, {});

        // Make our tree which we will use for serialization and validation
        var formTree = (0, _helpersTree2['default'])(this, refs);

        // Calculate how many times we should serialize in the case of
        // cycles when addValidationFieldErrors is true. We do this by
        // counting how many nodes are in our tree
        var refLength = formTree.map(function () {
            return 1;
        }).reduce(function (a, b) {
            return a + b;
        }, 0);
        var iteration = 0;

        var form = getBlankForm();
        var oldForm = getBlankForm();

        do {
            // Keep a copy of the previous iteration of the form so we can
            // detect if the form is stable to exit early
            oldForm = _extends({}, form);

            // Gather our fieldValues from our tree
            form.fieldValues = treeValue(formTree);

            // Make a new temporary error tree. We will use this tree to
            // generate a nested object (fieldErrors) and again to reduce it
            // into an array (errors)
            var formTreeErrors = formTree.extend(function (tree) {
                var validators = getValidators(tree.value);
                var value = tree.value.getValue ? tree.value.getValue() : treeValue(tree);
                var fieldValues = form.fieldValues;
                var fieldErrors = _this.props.addValidationFieldErrors ? oldForm.fieldErrors : null;

                return validators.map(function (fn) {
                    return fn(value, fieldValues, fieldErrors);
                }).filter(_helpersIdentity2['default']);
            });

            form.fieldErrors = formTreeErrors.extract();
            form.errors = formTreeErrors.reduce(function (acc, val) {
                return acc.concat(val);
            }, []);

            iteration++;

            // If we don't need fieldErrors in our validators, we only need to
            // execute this do..while once. We need to loop because we don't have
            // explicit dependencies. We fake dependencies by making
            // an eventually stable tree.
        } while (this.props.addValidationFieldErrors && iteration < refLength && JSON.stringify(form) !== JSON.stringify(oldForm));

        // Update valid here so our formValidators can make use of it
        form.errors = (0, _helpersUniq2['default'])(form.errors.filter(_helpersIdentity2['default']));
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
        var errorsRule = (0, _helpersCloneChildren.createErrorsRule)(this.state.errors, this.state.fieldErrors);
        var formableRule = (0, _helpersCloneChildren.createFormableRule)(this.state.errors, this.state.fieldErrors, this.onSubmit, this.onChange);

        return _react2['default'].createElement(
            'form',
            _extends({}, this.props, {
                ref: 'form',
                onSubmit: this.onSubmit,
                onChange: function () {},
                onKeyDown: this.onKeyDown }),
            (0, _helpersCloneChildren2['default'])([errorsRule, formableRule], this.props.children)
        );
    }
});