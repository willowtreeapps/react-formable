'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = required;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersIsNil = require('../helpers/isNil');

var _helpersIsNil2 = _interopRequireDefault(_helpersIsNil);

function emptyString(value) {
    return !value.trim().length;
}

function emptyObject(value) {
    return !Object.keys(value).length;
}

/*eslint func-style:0*/

function required(errorMessage) {
    return function (value) {
        if ((0, _helpersIsNil2['default'])(value)) {
            return errorMessage;
        }
        if (typeof value === 'string' && emptyString(value)) {
            return errorMessage;
        } else if (typeof value === 'object' && emptyObject(value)) {
            return errorMessage;
        }
    };
}

module.exports = exports['default'];