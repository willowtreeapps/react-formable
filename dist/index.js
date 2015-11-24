'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './form', './inputs/input', './inputs/test'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./form'), require('./inputs/input'), require('./inputs/test'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.form, global.input, global.test);
		global.index = mod.exports;
	}
})(this, function (exports, _form, _input, _test) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Inputs = exports.Form = undefined;

	var _form2 = _interopRequireDefault(_form);

	var _input2 = _interopRequireDefault(_input);

	var _test2 = _interopRequireDefault(_test);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var Form = exports.Form = _form2.default;
	var Inputs = exports.Inputs = {
		input: _input2.default,
		test: _test2.default
	};
});