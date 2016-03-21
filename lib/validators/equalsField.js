'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = required;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersDeepFind = require('../helpers/deepFind');

var _helpersDeepFind2 = _interopRequireDefault(_helpersDeepFind);

/*eslint func-style:0*/

function required(equalsField, errorMessage) {
    return function (value, fieldValues) {
        if ((0, _helpersDeepFind2['default'])(fieldValues, equalsField) !== value) {
            return errorMessage;
        }
    };
}

module.exports = exports['default'];