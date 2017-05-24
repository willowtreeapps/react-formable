"use strict";
var React = require("react");
exports.Errors = function (_a) {
    var _b = _a.renderError, renderError = _b === void 0 ? (function (x) { return x; }) : _b, _c = _a.errors, errors = _c === void 0 ? [] : _c, _d = _a._errors, _errors = _d === void 0 ? [] : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    var allErrors = errors.concat(_errors).filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
    var errorLis = allErrors.reduce(function (memo, error, i) {
        var el = renderError(error);
        return el ? memo.concat(React.createElement("li", { key: error.toString() + i }, el)) : memo;
    }, []);
    return !!allErrors.length && React.createElement("ul", { className: className + " errors" }, errorLis);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Errors;
//# sourceMappingURL=Errors.js.map