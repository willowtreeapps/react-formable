"use strict";
var setPath = function (value, path, json) {
    // We reached the end, return the value as a leaf
    if (!path.length)
        return value;
    // Figure out if we are going down an array or object
    var isArrayMatch = path[0].match(/^\[(\d+)\]$/);
    var name = isArrayMatch ? isArrayMatch[1] : path[0];
    var nextPathIsArray = path[1] && path[1].match(/^\[(\d+)\]$/);
    var nextPathIndex = nextPathIsArray ? nextPathIsArray[1] : '';
    // Add the value to our json recursivly
    json = json || (isArrayMatch ? [] : {});
    if (nextPathIndex === '1') {
        json[name] = [json[name]];
        json[name] = setPath(value, path.slice(1), json[name]);
    }
    else {
        json[name] = setPath(value, path.slice(1), json[name]);
    }
    return json;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (key, treeArray) {
    return treeArray.reduce(function (tree, node) { return setPath(node[key], node.path, tree); }, {});
};
//# sourceMappingURL=inflateTree.js.map