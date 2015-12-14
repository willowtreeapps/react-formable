/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = uuid;

function uuid() {
    return Math.floor(Math.random() * 100000000000);
}

module.exports = exports["default"];