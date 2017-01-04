"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const Errors_1 = require("./Errors");
const Form_1 = require("./Form");
const findInTree = (path, key, arr = []) => {
    let keyNode, pathNode;
    for (let i = 0; i < arr.length; i++) {
        if (key && arr[i].key && arr[i].key === key)
            keyNode = keyNode || arr[i];
        if (arr[i].path === path)
            pathNode = pathNode || arr[i];
    }
    return keyNode || pathNode;
};
const clone = (options) => {
    let tree = [];
    let nodeIndexCount = __assign({}, options.nodeIndexCount);
    const children = React.Children.map(options.children, (child) => {
        // CASE: Plain Text (Non React node)
        if (typeof child !== 'object' || child === null)
            return child;
        // CASE: Errors Component
        if (child.type === Errors_1.default)
            return React.cloneElement(child, { _errors: options.errors });
        const name = child.props[options.propName];
        // CASE: Non Formable Node, div, span, etc
        if (!name) {
            const cloneResults = clone(__assign({}, options, { children: child.props.children, nodeIndexCount }));
            nodeIndexCount = cloneResults.nodeIndexCount;
            tree = tree.concat(cloneResults.tree);
            return React.cloneElement(child, {}, cloneResults.children);
        }
        nodeIndexCount[name] = (nodeIndexCount[name] || 0) + 1;
        const nodeIndex = nodeIndexCount[name] - 1;
        // CASE: Formable Node
        let path = [options.path, name, nodeIndex && `[${nodeIndex}]`].filter(x => x).join('.');
        const { children, tree: subTree } = clone(__assign({}, options, { path,
            tree, children: child.props.children, nodeIndexCount: {} }));
        // SUBCASE: Formable node with children (wrapper node)
        if (subTree.length) {
            tree = tree.concat(subTree);
            return React.cloneElement(child, {}, children);
        }
        const { defaultProp, eventName, getValueFromEvent, fieldErrorsToProps, valueProp } = options.configureForm(child.type, child.props) || Form_1.defaultConfigureInput;
        // SUBCASE: Normal Formable node without children
        const oldTreeNode = findInTree(path, child.key, options.previousRenderTree);
        const fieldErrors = oldTreeNode ? oldTreeNode.fieldErrors : [];
        // console.log(oldTreeNode);
        // If we have an old node, get the value from that node,
        // otherwise derive the value from props
        const value = oldTreeNode
            ? oldTreeNode.value
            : child.props[valueProp] !== undefined
                ? child.props[valueProp]
                : child.props[defaultProp];
        tree = tree.concat({
            value,
            fieldErrors,
            path,
            name,
            key: child.key,
            validators: [...(child.props.validators || []), ...(child.type.validators || [])],
        });
        let newProps = __assign({}, child.props, (fieldErrorsToProps(fieldErrors, child.props)), { ref: child.ref, [eventName]: (e) => {
                options.onChange(path, getValueFromEvent(e));
                if (child.props[eventName]) {
                    child.props[eventName](e);
                }
            } });
        if (options.removeValidators)
            delete newProps.validators;
        if (options.removePropName)
            delete newProps[options.propName];
        return React.createElement(child.type, newProps, children);
    });
    return { children, tree, nodeIndexCount };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clone;
//# sourceMappingURL=clone.js.map