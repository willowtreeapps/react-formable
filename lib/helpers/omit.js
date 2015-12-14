/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = omit;

function omit(names, obj) {
    var result = {};

    for (var prop in obj) {
        if (names.indexOf(prop) === -1) {
            result[prop] = obj[prop];
        }
    }

    return result;
}

module.exports = exports["default"];