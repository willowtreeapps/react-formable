'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = maxLength;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersIsNil = require('../helpers/isNil');

var _helpersIsNil2 = _interopRequireDefault(_helpersIsNil);

/*eslint func-style:0*/

function maxLength(maxLength, errorMessage) {
    return function (value) {
        if ((0, _helpersIsNil2['default'])(value) || value.length > maxLength) {
            return errorMessage;
        }
    };
}

module.exports = exports['default'];