"use strict";
const React = require("react");
exports.Errors = ({ renderError = (x => x), errors = [], _errors = [], className = '' }) => {
    const allErrors = errors.concat(_errors);
    const errorLis = allErrors.reduce((memo, error, i) => {
        const el = renderError(error);
        return el ? memo.concat(React.createElement("li", { key: error.toString() + i }, el)) : memo;
    }, []);
    return !!allErrors.length && React.createElement("ul", { className: `${className} errors` }, errorLis);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Errors;
//# sourceMappingURL=Errors.js.map