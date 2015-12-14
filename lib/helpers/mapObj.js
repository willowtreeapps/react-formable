/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = mapObj;

function mapObj(fn, obj) {
    var ret = {};

    for (var key in obj) {
        ret[key] = fn(obj[key], key);
    }
    return ret;
}

module.exports = exports["default"];