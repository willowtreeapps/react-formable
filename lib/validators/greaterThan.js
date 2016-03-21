/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = greaterThan;

function greaterThan(greaterThanValue, errorMessage) {
    return function (value) {
        if (parseFloat(value) <= greaterThanValue) {
            return errorMessage;
        }
    };
}

module.exports = exports["default"];