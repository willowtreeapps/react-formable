/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = deepFind;

function deepFind(obj, path) {
    var paths = path.split('.');
    var current = obj,
        i = undefined;

    for (i = 0; i < paths.length; ++i) {
        if (current[paths[i]] == undefined) {
            return undefined;
        }
        current = current[paths[i]];
    }
    return current;
}

module.exports = exports['default'];