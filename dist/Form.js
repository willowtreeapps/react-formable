"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var React = require("react");
var inflateTree_1 = require("./inflateTree");
var clone_1 = require("./clone");
var validation_1 = require("./validation");
var debounce_1 = require("./debounce");
exports.defaultFieldErrorsToProps = function (fieldErrors, props) { return ({
    className: (fieldErrors.length ? 'error' : '') + " " + props.className
}); };
exports.defaultConfigureInput = {
    eventName: 'onChange',
    getValueFromEvent: function (e) { return e.target.value; },
    defaultProp: 'defaultValue',
    valueProp: 'value'
};
var defaultConfigureCheckbox = {
    eventName: 'onChange',
    getValueFromEvent: function (e) { return e.target.checked; },
    defaultProp: 'defaultChecked',
    valueProp: 'checked'
};
var defaultConfigureUpload = {
    eventName: 'onChange',
    getValueFromEvent: function (e) { return e.target.files; },
    defaultProp: 'defaultValue',
    valueProp: 'value'
};
var _Form = (function (_super) {
    __extends(_Form, _super);
    function _Form() {
        var _this = _super.apply(this, arguments) || this;
        _this.state = { errors: [] };
        _this.dirtyNodes = [];
        _this.tree = [];
        _this.clear = function () {
            _this.tree = [];
            _this.dirtyNodes = [];
            _this.setState({ errors: [] });
            if (_this.props.onChange)
                _this.props.onChange({});
        };
        _this.clearFieldErrors = function () {
            _this.dirtyNodes = [];
            _this.tree = _this.tree.map(function (node) { return (__assign({}, node, { fieldErrors: [] })); });
            _this.setState({ errors: [] });
        };
        _this.showFieldErrors = function () {
            // this.serialize().validation.then(({ validatedTree, errors }) => {
            //     this.tree = validatedTree
            //     this.setState({ errors })
            // })
        };
        // Only really ment for the outside world if they are doing some complex form stuff
        _this.serialize = function () {
            var paths = _this.tree.map(function (node) { return node.path.join('.'); });
            var fieldValues = inflateTree_1.default('value', _this.tree);
            var validation = validation_1.validate(_this.tree, fieldValues, 'serialize', paths);
            return { fieldValues: fieldValues, validation: validation };
        };
        _this.validate = debounce_1.default(function (fieldValues, eventType, cb) {
            var paths = (eventType === 'onChange' && _this.props.showErrorsOnChange === 'field')
                ? _this.dirtyNodes
                : _this.tree.map(function (node) { return node.path.join('.'); });
            _this.dirtyNodes = [];
            return validation_1.validate(_this.tree, fieldValues, eventType, paths).then(function (_a) {
                var validatedTree = _a.validatedTree, errors = _a.errors, fieldErrors = _a.fieldErrors, valid = _a.valid;
                _this.tree = validatedTree;
                cb({ errors: errors, fieldErrors: fieldErrors, valid: valid });
            });
        }, _this.props.debounceValidation);
        _this.onChange = function (path, value) {
            _this.dirtyNodes.push(path.join('.'));
            _this.tree = _this.tree.map(function (node) {
                return node.path === path ? __assign({}, node, { value: value }) : node;
            });
            // No callback and we are not showing errors, no need to do any work
            if (!_this.props.onChange && !_this.props.showErrorsOnChange)
                return;
            // In both cases, we need to inflate the current form object
            var fieldValues = inflateTree_1.default('value', _this.tree);
            // Trigger on change immediately as to not block any potential dependencies on this data
            if (_this.props.onChange)
                _this.props.onChange(fieldValues);
            _this.validate(fieldValues, 'onChange', function (validation) {
                if (_this.props.showErrorsOnChange)
                    _this.setState({ errors: validation.errors });
                // After we are done validating, if the onChange asked for validation, give it to them
                // We have to call onChange twice since debounceing means we won't always have validation
                if (_this.props.onChange && _this.props.onChange.length !== 1) {
                    _this.props.onChange(inflateTree_1.default('value', _this.tree), validation);
                }
            });
        };
        _this.onSubmit = function (e) {
            e.preventDefault();
            // No one is expecting work, no need to validate
            if (!_this.props.onSubmit && !_this.props.showErrorsOnSubmit)
                return;
            var fieldValues = inflateTree_1.default('value', _this.tree);
            // Clear old validations
            _this.validate.cancel();
            _this.validate(fieldValues, 'onSubmit', function (validation) {
                if (_this.props.showErrorsOnSubmit)
                    _this.setState({ errors: validation.errors });
                if (_this.props.onSubmit && (validation.valid || _this.props.noValidate))
                    _this.props.onSubmit(fieldValues, validation);
            });
            // Immediately execute submit validation
            _this.validate.flush();
        };
        return _this;
    }
    _Form.prototype.render = function () {
        var _a = this.props, removePropName = _a.removePropName, removeValidators = _a.removeValidators, onChange = _a.onChange, onSubmit = _a.onSubmit, showErrorsOnChange = _a.showErrorsOnChange, fieldErrorsToProps = _a.fieldErrorsToProps, showErrorsOnSubmit = _a.showErrorsOnSubmit, debounceValidation = _a.debounceValidation, propName = _a.propName, configureForm = _a.configureForm, props = __rest(_a, ["removePropName", "removeValidators", "onChange", "onSubmit", "showErrorsOnChange", "fieldErrorsToProps", "showErrorsOnSubmit", "debounceValidation", "propName", "configureForm"]);
        var _b = clone_1.default({
            children: this.props.children,
            path: [],
            tree: [],
            nodeIndexCount: {},
            removeValidators: removeValidators,
            removePropName: removePropName,
            propName: propName,
            fieldErrorsToProps: fieldErrorsToProps,
            configureForm: configureForm,
            onChange: this.onChange,
            previousRenderTree: this.tree || [],
            errors: this.state.errors,
        }), children = _b.children, tree = _b.tree;
        this.tree = tree;
        return React.createElement("form", __assign({}, props, { onSubmit: this.onSubmit, onChange: function () { }, onReset: this.clear, noValidate: true }), children);
    };
    return _Form;
}(React.Component));
_Form.defaultProps = {
    propName: 'name',
    showErrorsOnSubmit: true,
    debounceValidation: 0,
    removePropName: false,
    fieldErrorsToProps: exports.defaultFieldErrorsToProps,
    removeValidators: true,
    noValidate: false,
    configureForm: function (type, props) {
        return type === 'input' && (props.type === 'radio' || props.type === 'checkbox') ? defaultConfigureCheckbox :
            type === 'input' && props.type === 'file' ? defaultConfigureUpload :
                exports.defaultConfigureInput;
    }
};
exports.Form = _Form;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _Form;
//# sourceMappingURL=Form.js.map