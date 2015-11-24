"use strict";

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.uniq = mod.exports;
    }
})(this, function (exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = uniq;

    function uniq(arr) {
        return arr.reduce(function (memo, item) {
            return memo.indexOf(item) === -1 ? memo.concat(item) : memo;
        }, []);
    }
});