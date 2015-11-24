"use strict";

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.input = mod.exports;
    }
})(this, function (exports, _react) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

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

    var identity = function identity(x) {
        return x;
    };

    exports.default = _react2.default.createClass({
        displayName: "input",

        propTypes: {},

        validators: [function (val) {
            console.log(val);
        }],

        getDefaultProps: function getDefaultProps() {
            return {
                onChange: identity,
                onSubmit: identity
            };
        },
        serialize: function serialize() {
            return this.refs.input.value;
        },
        render: function render() {
            return _react2.default.createElement("input", _extends({ ref: "input"
            }, this.props, {
                onChange: this.onChange }));
        }
    });
});