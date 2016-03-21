'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = minLength;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersIsNil = require('../helpers/isNil');

var _helpersIsNil2 = _interopRequireDefault(_helpersIsNil);

/*eslint func-style:0*/

function minLength(minLength, errorMessage) {
    return function (value) {
        if ((0, _helpersIsNil2['default'])(value) || value.length < minLength) {
            return errorMessage;
        }
    };
}

module.exports = exports['default'];