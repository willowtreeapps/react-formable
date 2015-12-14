/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = cloneChildren;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * Clones a child subtree, when we encounter a component that passes our
 * predicate pass it down additional props.
 *
 * @param  {Function} predicate A predicate function which recives the child
 * @param  {Function} getProps  A function which recives the component and
 * returns an object which gets merged into the props of the component
 * @param  {Function} children The children to iterate over
 * @return {Object} The cloned children
 */

function cloneChildren(predicate, getProps, children) {
    if (typeof children !== 'object' || children === null) {
        return children;
    }

    return _react2['default'].Children.map(children, function (child) {
        if (typeof child !== 'object' || child === null) {
            return child;
        }

        if (predicate(child)) {
            return _react2['default'].cloneElement(child, getProps(child), child.props && child.props.children);
        }

        return _react2['default'].cloneElement(child, {}, cloneChildren(predicate, getProps, child.props && child.props.children));
    });
}

module.exports = exports['default'];