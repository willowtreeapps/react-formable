"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var Errors_1 = require("./Errors");
var Form_1 = require("./Form");
var findInTree = function (path, key, arr) {
    if (arr === void 0) { arr = []; }
    var keyNode, pathNode;
    for (var i = 0; i < arr.length; i++) {
        if (key && arr[i].key && arr[i].key === key)
            keyNode = keyNode || arr[i];
        if (arr[i].path === path)
            pathNode = pathNode || arr[i];
    }
    return keyNode || pathNode;
};
var clone = function (options) {
    var tree = [];
    var nodeIndexCount = __assign({}, options.nodeIndexCount);
    var children = React.Children.map(options.children, function (child) {
        // CASE: Plain Text (Non React node)
        if (typeof child !== 'object' || child === null)
            return child;
        // CASE: Errors Component
        if (child.type === Errors_1.default)
            return React.cloneElement(child, { _errors: options.errors });
        var name = child.props[options.propName];
        // CASE: Non Formable Node, div, span, etc
        if (!name) {
            var cloneResults = clone(__assign({}, options, { children: child.props.children, nodeIndexCount: nodeIndexCount }));
            nodeIndexCount = cloneResults.nodeIndexCount;
            tree = tree.concat(cloneResults.tree);
            return React.cloneElement(child, {}, cloneResults.children);
        }
        nodeIndexCount[name] = (nodeIndexCount[name] || 0) + 1;
        var nodeIndex = nodeIndexCount[name] - 1;
        // CASE: Formable Node
        var path = [options.path, name, nodeIndex && "[" + nodeIndex + "]"].filter(function (x) { return x; }).join('.');
        var _a = clone(__assign({}, options, { path: path,
            tree: tree, children: child.props.children, nodeIndexCount: {} })), children = _a.children, subTree = _a.tree;
        // SUBCASE: Formable node with children (wrapper node)
        if (subTree.length) {
            tree = tree.concat(subTree);
            return React.cloneElement(child, {}, children);
        }
        var _b = options.configureForm(child.type, child.props) || Form_1.defaultConfigureInput, defaultProp = _b.defaultProp, eventName = _b.eventName, getValueFromEvent = _b.getValueFromEvent, fieldErrorsToProps = _b.fieldErrorsToProps, valueProp = _b.valueProp;
        var errorsToProps = fieldErrorsToProps || options.fieldErrorsToProps;
        // SUBCASE: Normal Formable node without children
        var oldTreeNode = findInTree(path, child.key, options.previousRenderTree);
        var fieldErrors = oldTreeNode ? oldTreeNode.fieldErrors : [];
        // If we have an old node, get the value from that node,
        // otherwise derive the value from props
        var value = oldTreeNode
            ? oldTreeNode.value
            : child.props[valueProp] !== undefined
                ? child.props[valueProp]
                : child.props[defaultProp];
        tree = tree.concat({
            value: value,
            fieldErrors: fieldErrors,
            path: path,
            name: name,
            key: child.key,
            validators: (child.props.validators || []).concat((child.type.validators || [])),
        });
        var newProps = __assign({}, child.props, errorsToProps(fieldErrors, child.props), (_c = { ref: child.ref }, _c[eventName] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            options.onChange(path, getValueFromEvent.apply(void 0, args));
            if (child.props[eventName]) {
                (_a = child.props)[eventName].apply(_a, args);
            }
            var _a;
        }, _c));
        if (options.removeValidators)
            delete newProps.validators;
        if (options.removePropName)
            delete newProps[options.propName];
        return React.createElement(child.type, newProps, children);
        var _c;
    });
    return { children: children, tree: tree, nodeIndexCount: nodeIndexCount };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clone;
//# sourceMappingURL=clone.js.map