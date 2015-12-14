/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = flatten;

function flatten(arr) {
    return [].concat.apply([], arr);
}

module.exports = exports["default"];