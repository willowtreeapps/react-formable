/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = tree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mapObj = require('./mapObj');

var _mapObj2 = _interopRequireDefault(_mapObj);

var _values = require('./values');

var _values2 = _interopRequireDefault(_values);

/**
 * map
 *
 * Not your traditional map which is probably bad. This version is a noop when
 * its data is null. Defaults to implemented map and also allows mapping over
 * objects
 *
 * map :: (a -> b) -> [a] | {a} -> [a] | {b}
 *
 * @param {Function} fn Callback that transforms a value
 * @param {a|Array|Object} data the information to map over
 * @return {a|Array|Object} Returns whatever the data value is transformed
 */
function _map(fn) {
    return function (data) {
        if (!data) return;

        if (data.map) return data.map(fn);

        if (typeof data === 'object') {
            return (0, _mapObj2['default'])(fn, data);
        }
    };
}

function tree(value, children) {
    return {
        // The children of the tree
        value: value,

        // The value which we will map over
        children: children,

        // Map over each value in the tree reciving and modifying value
        map: function map(fn) {
            return tree(fn(value), _map(_map(fn))(children));
        },

        // Get the value of the (sub)tree as an object / array
        extract: function extract() {
            return children ? _map(function (x) {
                return x.extract();
            })(children) : value;
        },

        // Create a new tree by maping over the full tree
        // fn takes in the full tree value. Whatever fn returns gets
        // stored within the value of the node. Recuses down the tree
        extend: function extend(fn) {
            return tree(fn(tree(value, children)), _map(function (x) {
                return x.extend(fn);
            })(children));
        },

        // Boil down the tree into one value, node by node
        // fn recives the value value for each node
        reduce: function reduce(fn, acc) {
            return (0, _values2['default'])(children).reduce(function (memo, node) {
                return node.reduce(fn, memo);
            }, fn(acc, value));
        }
    };
}

module.exports = exports['default'];