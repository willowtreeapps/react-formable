'use strict';

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './helpers/keys', './helpers/mapObj', './helpers/uniq', './helpers/isNil', './helpers/values', './helpers/flatten', './helpers/identity'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./helpers/keys'), require('./helpers/mapObj'), require('./helpers/uniq'), require('./helpers/isNil'), require('./helpers/values'), require('./helpers/flatten'), require('./helpers/identity'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.keys, global.mapObj, global.uniq, global.isNil, global.values, global.flatten, global.identity);
        global.form = mod.exports;
    }
})(this, function (exports, _react, _keys, _mapObj, _uniq, _isNil, _values, _flatten, _identity) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _keys2 = _interopRequireDefault(_keys);

    var _mapObj2 = _interopRequireDefault(_mapObj);

    var _uniq2 = _interopRequireDefault(_uniq);

    var _isNil2 = _interopRequireDefault(_isNil);

    var _values2 = _interopRequireDefault(_values);

    var _flatten2 = _interopRequireDefault(_flatten);

    var _identity2 = _interopRequireDefault(_identity);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _typeof(obj) {
        return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
    }

    exports.default = _react2.default.createClass({
        displayName: 'form',

        propTypes: {
            // Handlers for your form callbacks. These will be called with the
            // current serialization of the form
            onSubmit: _react.PropTypes.func,
            onChange: _react.PropTypes.func,

            // Default React children prop
            children: _react.PropTypes.node
        },

        getDefaultProps: function getDefaultProps() {
            return {
                onChange: function onChange() {},
                onSubmit: function onSubmit() {}
            };
        },
        serialize: function serialize() {
            // We only care about things that can be serilized
            var refs = [];
            var refNameHash = {};
            var refNameHashErrors = {};
            for (var key in this.refs) {
                if (!this.refs[key].serialize) continue;

                refs[key] = this.refs[key];
                refNameHash[key] = undefined;
                refNameHashErrors = [];
            }

            // Set the initial form value
            var form = {
                valid: true,
                fieldValues: refNameHash,
                fieldErrors: refNameHashErrors,
                errors: []
            };

            var oldForm = form;
            var stable = false;
            var iteration = 0;
            var refLength = (0, _keys2.default)(refs).length;

            while (iteration < refLength && !stable) {
                // Keep a copy of the previous iteration of the form so we can
                // detect if the form is stable to exit early
                oldForm = Object.assign({}, form);

                // Get all the values of the form in no particular order
                form.fieldValues = (0, _mapObj2.default)(function (ref) {
                    return ref.serialize(form.fieldValues);
                }, refs);

                // Get all the errors for the fields
                form.fieldErrors = (0, _mapObj2.default)(function (ref, name) {
                    // We want to make validators as flexible as possible. We
                    // will let the component add its own validators and set them
                    // to state and allow the parent to supply them w/o the child
                    // caring via props
                    console.log(ref.validators);
                    var stateValidators = ref.state && ref.state.validators || [];
                    var refValidators = [];
                    var propValidators = ref.props.validators || [];
                    var validators = [].concat(stateValidators, propValidators);

                    // Get all the error messages and remove nulls
                    return validators.map(function (validator) {
                        return validator(form.fieldValues[name], form.fieldValues, form.fieldErrors);
                    }).filter(_identity2.default);
                }, refs);

                // Provide a flattened list of uniq errors for easy UI display
                form.errors = (0, _uniq2.default)((0, _flatten2.default)((0, _values2.default)(form.fieldErrors))).filter(function (x) {
                    return !(0, _isNil2.default)(x);
                });

                // Have a helper property to detect if the form is overall valid
                form.valid = !form.errors.length;

                // Set ourselves up for the next iteration
                // TODO: Evenatually we will need to check equality
                stable = false;
                iteration++;
            }

            return form;
        },
        onChange: function onChange() {
            this.props.onChange(this.serialize());
        },
        onSubmit: function onSubmit() {
            this.props.onSubmit(this.serialize());
        },
        cloneChildren: function cloneChildren(children) {
            if ((typeof children === 'undefined' ? 'undefined' : _typeof(children)) !== 'object' || children === null) {
                return children;
            }

            return _react2.default.Children.map(children, function (child) {
                if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || child === null) {
                    return child;
                }

                if (child.props && child.props.name) {
                    return _react2.default.cloneElement(child, {
                        ref: child.props.name,
                        onChange: this.onChange,
                        onSubmit: this.onSubmit
                    }, child.props && child.props.children);
                } else {
                    return _react2.default.cloneElement(child, {}, this.cloneChildren(child.props && child.props.children));
                }
            }, this);
        },
        render: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'form',
                    onChange: this.onChange,
                    onSubmit: this.onSubmit,
                    onKeyDown: this.onKeyDown,
                    noValidate: true }),
                this.cloneChildren(this.props.children)
            );
        }
    });
});