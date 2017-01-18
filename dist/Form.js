"use strict";
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
const React = require("react");
const inflateTree_1 = require("./inflateTree");
const clone_1 = require("./clone");
const validation_1 = require("./validation");
const debounce_1 = require("./debounce");
exports.defaultFieldErrorsToProps = (fieldErrors, props) => ({
    className: `${fieldErrors.length ? 'error' : ''} ${props.className}`
});
exports.defaultConfigureInput = {
    eventName: 'onChange',
    getValueFromEvent: (e) => e.target.value,
    defaultProp: 'defaultValue',
    valueProp: 'value'
};
const defaultConfigureCheckbox = {
    eventName: 'onChange',
    getValueFromEvent: (e) => e.target.checked,
    defaultProp: 'defaultChecked',
    valueProp: 'checked'
};
class _Form extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { errors: [] };
        this.dirtyNodes = [];
        this.tree = [];
        this.clear = () => {
            this.tree = [];
            this.dirtyNodes = [];
            this.setState({ errors: [] });
            if (this.props.onChange)
                this.props.onChange({});
        };
        this.clearFieldErrors = () => {
            this.dirtyNodes = [];
            this.tree = this.tree.map(node => (__assign({}, node, { fieldErrors: [] })));
            this.setState({ errors: [] });
        };
        this.showFieldErrors = () => {
            // this.serialize().validation.then(({ validatedTree, errors }) => {
            //     this.tree = validatedTree
            //     this.setState({ errors })
            // })
        };
        // Only really ment for the outside world if they are doing some complex form stuff
        this.serialize = () => {
            const paths = this.tree.map(node => node.path);
            const fieldValues = inflateTree_1.default('value', this.tree);
            const validation = validation_1.validate(this.tree, fieldValues, 'serialize', paths);
            return { fieldValues, validation };
        };
        this.validate = debounce_1.default((fieldValues, eventType, cb) => {
            const paths = (eventType === 'onChange' && this.props.showErrorsOnChange === 'field')
                ? this.dirtyNodes
                : this.tree.map(node => node.path);
            this.dirtyNodes = [];
            return validation_1.validate(this.tree, fieldValues, eventType, paths).then(({ validatedTree, errors, fieldErrors, valid }) => {
                this.tree = validatedTree;
                cb({ errors, fieldErrors, valid });
            });
        }, this.props.debounceValidation);
        this.onChange = (path, value) => {
            this.dirtyNodes.push(path);
            this.tree = this.tree.map(node => {
                return node.path === path ? __assign({}, node, { value }) : node;
            });
            // No callback and we are not showing errors, no need to do any work
            if (!this.props.onChange && !this.props.showErrorsOnChange)
                return;
            // In both cases, we need to inflate the current form object
            const fieldValues = inflateTree_1.default('value', this.tree);
            // Trigger on change immediately as to not block any potential dependencies on this data
            if (this.props.onChange)
                this.props.onChange(fieldValues);
            this.validate(fieldValues, 'onChange', (validation) => {
                if (this.props.showErrorsOnChange)
                    this.setState({ errors: validation.errors });
                // After we are done validating, if the onChange asked for validation, give it to them
                // We have to call onChange twice since debounceing means we won't always have validation
                if (this.props.onChange && this.props.onChange.length !== 1) {
                    this.props.onChange(inflateTree_1.default('value', this.tree), validation);
                }
            });
        };
        this.onKeyDown = (e) => e.key === 'Enter' && this.onSubmit(e);
        this.onSubmit = (e) => {
            e.preventDefault();
            // No one is expecting work, no need to validate
            if (!this.props.onSubmit && !this.props.showErrorsOnSubmit)
                return;
            const fieldValues = inflateTree_1.default('value', this.tree);
            // Clear old validations
            this.validate.cancel();
            this.validate(fieldValues, 'onSubmit', (validation) => {
                if (this.props.showErrorsOnSubmit)
                    this.setState({ errors: validation.errors });
                if (this.props.onSubmit && (validation.valid || this.props.noValidate))
                    this.props.onSubmit(fieldValues, validation);
            });
            // Immediately execute submit validation
            this.validate.flush();
        };
    }
    render() {
        let _a = this.props, { removePropName, removeValidators, onChange, onSubmit, showErrorsOnChange, fieldErrorsToProps, showErrorsOnSubmit, debounceValidation, propName, configureForm } = _a, props = __rest(_a, ["removePropName", "removeValidators", "onChange", "onSubmit", "showErrorsOnChange", "fieldErrorsToProps", "showErrorsOnSubmit", "debounceValidation", "propName", "configureForm"]);
        const { children, tree } = clone_1.default({
            children: this.props.children,
            path: '',
            tree: [],
            nodeIndexCount: {},
            removeValidators,
            removePropName,
            propName,
            fieldErrorsToProps,
            configureForm,
            onChange: this.onChange,
            previousRenderTree: this.tree || [],
            errors: this.state.errors,
        });
        this.tree = tree;
        return React.createElement("form", __assign({ onSubmit: this.onSubmit, onChange: () => { }, onReset: this.clear, onKeyDown: this.onKeyDown }, props), children);
    }
}
_Form.defaultProps = {
    propName: 'name',
    showErrorsOnChange: undefined,
    showErrorsOnSubmit: true,
    debounceValidation: 0,
    removePropName: false,
    fieldErrorsToProps: exports.defaultFieldErrorsToProps,
    removeValidators: true,
    noValidate: false,
    configureForm: (type, props) => type === 'input' && (props.type === 'radio' || props.type === 'checkbox')
        ? defaultConfigureCheckbox
        : exports.defaultConfigureInput
};
exports.Form = _Form;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _Form;
//# sourceMappingURL=Form.js.map