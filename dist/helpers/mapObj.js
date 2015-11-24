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
        global.mapObj = mod.exports;
    }
})(this, function (exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = mapObj;

    function mapObj(fn, obj) {
        var ret = {};

        for (var key in obj) {
            ret[key] = fn(obj[key], key);
        }

        return ret;
    }
});