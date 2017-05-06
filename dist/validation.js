"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var inflateTree_1 = require("./inflateTree");
// We want to wait for all promises to settle, regardless if they resolve or reject.
var promiseEvery = function (arr) {
    return Promise.all(arr.map(function (val) { return Promise.resolve(val).catch(function (x) { return x; }); }));
};
var validateNode = function (node, form, eventType) {
    return promiseEvery(node.validators.map(function (fn) { return fn(node.value, form, eventType); }))
        .then(function (fieldErrors) {
        return __assign({}, node, { fieldErrors: fieldErrors.filter(function (x) { return x; }) });
    });
};
exports.validate = function (tree, form, eventType, paths) {
    // Conver the paths array into a key value lookup
    var isPath = paths.reduce(function (memo, path) {
        return (__assign({}, memo, (_a = {}, _a[path] = true, _a)));
        var _a;
    }, {});
    var promisedTree = promiseEvery(tree.map(function (node) {
        return isPath[node.path.join('.')]
            ? validateNode(node, form, eventType)
            : node;
    }));
    return promisedTree.then(function (validatedTree) {
        var errors = validatedTree
            .reduce(function (memo, node) { return memo.concat(node.fieldErrors); }, [])
            .filter(function (val, i, self) { return self.indexOf(val) === i; });
        return {
            validatedTree: validatedTree,
            errors: errors,
            valid: !errors.length,
            fieldErrors: inflateTree_1.default('fieldErrors', validatedTree)
        };
    });
};
//# sourceMappingURL=validation.js.map