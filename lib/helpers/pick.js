/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = pick;

function pick(names, obj) {
    var result = {};
    var idx = 0;

    while (idx < names.length) {
        if (names[idx] in obj) {
            result[names[idx]] = obj[names[idx]];
        }
        idx += 1;
    }

    return result;
}

module.exports = exports["default"];