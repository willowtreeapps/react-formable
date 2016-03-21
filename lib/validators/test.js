/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = test;

function test(regexp, errorMessage) {
    return function (value) {
        var r = regexp && regexp.test ? regexp : new RegExp(regexp);

        if (!r.test(value)) {
            return errorMessage;
        }
    };
}

module.exports = exports["default"];