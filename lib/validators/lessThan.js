/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = lessThan;

function lessThan(lessThanValue, errorMessage) {
    return function (value) {
        if (parseFloat(value) >= lessThanValue) {
            return errorMessage;
        }
    };
}

module.exports = exports["default"];