"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const inflateTree_1 = require("./inflateTree");
// We want to wait for all promises to settle, regardless if they resolve or reject.
const promiseEvery = (arr) => Promise.all(arr.map(val => Promise.resolve(val).catch(x => x)));
const validateNode = (node, form, eventType) => {
    return promiseEvery(node.validators.map(fn => fn(node.value || '', form, eventType)))
        .then((fieldErrors) => {
        return __assign({}, node, { fieldErrors: fieldErrors.filter((x) => x) });
    });
};
exports.validate = (tree, form, eventType, paths) => {
    // Conver the paths array into a key value lookup
    const isPath = paths.reduce((memo, path) => (__assign({}, memo, { [path]: true })), {});
    const promisedTree = promiseEvery(tree.map(node => isPath[node.path]
        ? validateNode(node, form, eventType)
        : node));
    return promisedTree.then(validatedTree => {
        const errors = validatedTree
            .reduce((memo, node) => memo.concat(node.fieldErrors), [])
            .filter((val, i, self) => self.indexOf(val) === i);
        return {
            validatedTree,
            errors,
            valid: !errors.length,
            fieldErrors: inflateTree_1.default('fieldErrors', validatedTree)
        };
    });
};
//# sourceMappingURL=validation.js.map