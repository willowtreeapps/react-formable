require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if ("production" !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersIdentity = require('./helpers/identity');

var _helpersIdentity2 = _interopRequireDefault(_helpersIdentity);

var _helpersFlatten = require('./helpers/flatten');

var _helpersFlatten2 = _interopRequireDefault(_helpersFlatten);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

exports['default'] = _react2['default'].createClass({
    displayName: 'Errors',

    propTypes: {
        errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        fieldErrors: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
        additionalErrors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        scoped: _react.PropTypes.bool,
        renderError: _react.PropTypes.func,
        className: _react.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            errors: [],
            additionalErrors: [],
            fieldErrors: [],
            scoped: false,
            renderError: _helpersIdentity2['default'],
            className: ''
        };
    },

    render: function render() {
        var _this = this;

        var _props = this.props;
        var errors = _props.errors;
        var additionalErrors = _props.additionalErrors;
        var scoped = _props.scoped;

        var fieldErrors = (0, _helpersFlatten2['default'])((0, _helpersValues2['default'])(this.props.fieldErrors)).filter(function (s) {
            return typeof s === 'string';
        });

        var allErrors = [].concat(scoped ? fieldErrors : errors).concat(additionalErrors);

        var className = this.props.className + ' errors';

        return _react2['default'].createElement(
            'ul',
            _extends({}, this.props, { className: className }),
            allErrors.map(function (error, i) {
                return _react2['default'].createElement(
                    'li',
                    { key: i },
                    ' ',
                    _this.props.renderError(error),
                    ' '
                );
            })
        );
    }
});
module.exports = exports['default'];

},{"./helpers/flatten":9,"./helpers/identity":10,"./helpers/values":13,"react":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

var _fieldset = require('./fieldset');

var _fieldset2 = _interopRequireDefault(_fieldset);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

exports['default'] = _react2['default'].createClass({
    displayName: 'Fieldlist',

    propTypes: {
        errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        fieldErrors: _react.PropTypes.arrayOf(_react.PropTypes.object),
        name: _react.PropTypes.string.isRequired,
        children: _react.PropTypes.node
    },

    getInputs: function getInputs() {
        return {
            ref: this,
            refs: (0, _helpersValues2['default'])(this.refs.fieldset.getInputs().refs).filter(function (node) {
                return node.refs && (0, _helpersValues2['default'])(node.refs).length;
            })
        };
    },

    render: function render() {
        var _this = this;

        (0, _warning2['default'])(this.props.name, 'Fieldlist found without a name prop. The children of this component will behave eratically');

        var errors = this.props.errors || [];
        var fieldErrors = this.props.fieldErrors || [];

        // Overwrite errors and fieldErrors passed in here as fieldset expects
        // different errors than fieldlist. There is no need to pass them down
        return _react2['default'].createElement(
            _fieldset2['default'],
            _extends({}, this.props, {
                ref: 'fieldset',
                errors: [],
                fieldErrors: {} }),
            _react2['default'].Children.map(this.props.children, function (child, i) {
                return _react2['default'].createElement(
                    _fieldset2['default'],
                    { name: _this.props.name + i,
                        errors: errors,
                        fieldErrors: fieldErrors[i] },
                    child
                );
            })
        );
    }
});
module.exports = exports['default'];

},{"./fieldset":4,"./helpers/values":13,"react":undefined,"warning":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersCloneChildren = require('./helpers/cloneChildren');

var _helpersCloneChildren2 = _interopRequireDefault(_helpersCloneChildren);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

exports['default'] = _react2['default'].createClass({
    displayName: 'Fieldset',

    propTypes: {
        errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        fieldErrors: _react.PropTypes.object,
        name: _react.PropTypes.string.isRequired,
        children: _react.PropTypes.node
    },

    getInputs: function getInputs() {
        return {
            ref: this,
            refs: (0, _helpersValues2['default'])(this.refs || {}).filter(function (ref) {
                return ref.getInputs || ref.getValue;
            }).map(function (ref) {
                return ref.getInputs ? ref.getInputs() : { ref: ref };
            }).reduce(function (memo, node) {
                memo[node.ref.props.name] = node;
                return memo;
            }, {})
        };
    },

    render: function render() {
        (0, _warning2['default'])(this.props.name, 'Fieldset found without a name prop. The children of this component will behave eratically');
        var errorsRule = (0, _helpersCloneChildren.createErrorsRule)(this.props);
        var formableRule = (0, _helpersCloneChildren.createFormableRule)(this.props);

        return _react2['default'].createElement(
            'div',
            this.props,
            (0, _helpersCloneChildren2['default'])([errorsRule, formableRule], this.props.children)
        );
    }
});
module.exports = exports['default'];

},{"./helpers/cloneChildren":6,"./helpers/values":13,"react":undefined,"warning":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpersUniq = require('./helpers/uniq');

var _helpersUniq2 = _interopRequireDefault(_helpersUniq);

var _helpersValues = require('./helpers/values');

var _helpersValues2 = _interopRequireDefault(_helpersValues);

var _helpersIdentity = require('./helpers/identity');

var _helpersIdentity2 = _interopRequireDefault(_helpersIdentity);

var _helpersCloneChildren = require('./helpers/cloneChildren');

var _helpersCloneChildren2 = _interopRequireDefault(_helpersCloneChildren);

var getBlankForm = function getBlankForm() {
    return {
        valid: true,
        fieldValues: {},
        fieldErrors: {},
        errors: []
    };
};

exports.getBlankForm = getBlankForm;
var deNestErrors = function deNestErrors(_x) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
        var errors = _x;
        _again = false;

        // Our base case, strings or nulls
        if (!errors || typeof errors === 'string') return errors;

        // Arrays are objects, so we have to check arrays first
        // Iterate over each value in our array and denest it. Combine all These
        // results into one array and return it
        if (errors.constructor === Array) return [].concat.apply([], errors.map(function (val) {
            return deNestErrors(val);
        }));

        // Iterate over each value within our object and denest them
        if (typeof errors === 'object') {
            _arguments = [_x = (0, _helpersValues2['default'])(errors)];
            _again = true;
            continue _function;
        }

        // Fallback in case something real weird happens
        return errors;
    }
};

exports.deNestErrors = deNestErrors;
var nodeToValues = function nodeToValues(node) {
    // Whoops, bad things happening
    if (!node) return node;

    // We are either starting off or not at a leaf yet. Regardless traverse
    // the path downwards until we hit a leaf
    if (node.constructor === Array) {
        return node.reduce(function (memo, currentNode) {
            memo[currentNode.ref.props.name] = nodeToValues(currentNode);
            return memo;
        }, {});
    }

    if (node.refs && node.refs.constructor === Array) {
        return node.refs.map(function (r) {
            return nodeToValues(r);
        });
    }

    if (node.refs && typeof node.refs === 'object') {
        return (0, _helpersValues2['default'])(node.refs).reduce(function (memo, currentNode) {
            memo[currentNode.ref.props.name] = nodeToValues(currentNode);
            return memo;
        }, {});
    }

    // We are at a leaf, give our value back
    return node.ref.getValue();
};

// node: The current node we are looking at { ref: Object, refs?: Object|Array }
// treeValues: The current value / object in the tree
// treeErrors: The current array of errors / object of errors in the tree
// form: The overall form
// returns { fieldErrors: Object, errors: array }
var toErrors = function toErrors(node, treeValues, treeErrors, form) {
    if (treeErrors === undefined) treeErrors = {};

    // Something bad is happening here
    if (!node) return node;

    // The initial call to this function is an array of nodes
    if (node.constructor === Array) {
        var _ret = (function () {
            var errors = [];

            var fieldErrors = node.reduce(function (memo, currentNode) {
                var name = currentNode.ref.props.name;
                var childResult = toErrors(currentNode, treeValues[name], treeErrors[name], form);

                memo[name] = childResult.fieldErrors;
                errors = errors.concat(childResult.errors);
                return memo;
            }, {});

            return {
                v: { fieldErrors: fieldErrors, errors: errors }
            };
        })();

        if (typeof _ret === 'object') return _ret.v;
    }

    // We want to get errrors from the bottom up. To do this we start by always
    // getting the errors for our children first. Once we have our childrens
    // errors, we validate ourselves against our children. Lastly, we return the
    // result of these checks

    // These will be our return types:
    // fieldErrors: Object | Array (depending on the type of node.refs) If
    // node.refs doesn't exist it means we are a leaf and will have an array of
    // strings
    var fieldErrors = undefined;
    // errors: Array (always)
    var errors = [];

    // Here we have children, we are not a leaf
    if (node.refs) {
        if (node.refs.constructor === Array) {
            fieldErrors = node.refs.map(function (currentNode, i) {
                var childResult = toErrors(currentNode, treeValues[i], treeErrors[i], form);

                errors = errors.concat(childResult.errors);
                return childResult.fieldErrors;
            });
        } else {
            // Iterate over each child. And add our child errors to our errors
            fieldErrors = (0, _helpersValues2['default'])(node.refs).reduce(function (memo, currentNode) {
                var name = currentNode.ref.props.name;
                var childResult = toErrors(currentNode, treeValues[name], treeErrors[name], form);

                memo[name] = childResult.fieldErrors;
                errors = errors.concat(childResult.errors);
                return memo;
            }, {});
        }
    }

    // Get our current node's validators. They can be on props or this
    var validators = [].concat(node.ref.props.validators || [], node.ref.validators || []);
    // Validate the current node
    var validationErrors = validators.map(function (validator) {
        return validator.call(node.ref, treeValues, form.fieldValues, form.fieldErrors, treeErrors);
    }).filter(_helpersIdentity2['default']);

    errors = errors.concat(validationErrors);

    // Our field errors will either be our childrens fieldErrors (if we have
    // children) or our validation errors
    fieldErrors = fieldErrors || validationErrors;

    return { fieldErrors: fieldErrors, errors: errors };
};

exports['default'] = _react2['default'].createClass({
    displayName: 'Form',

    propTypes: {
        circular: _react.PropTypes.bool,

        // Handlers for your form callbacks. These will be called with the
        // current serialization of the form
        onSubmit: _react.PropTypes.func,
        onChange: _react.PropTypes.func,

        showErrorsOnSubmit: _react.PropTypes.bool,
        showErrorsOnChange: _react.PropTypes.bool,

        validators: _react.PropTypes.arrayOf(_react.PropTypes.func),

        // Default React children prop
        children: _react.PropTypes.node
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: function onChange() {},
            onSubmit: function onSubmit() {},
            showErrorsOnSubmit: true,
            showErrorsOnChange: false
        };
    },

    getInitialState: function getInitialState() {
        return {
            fieldErrors: {},
            errors: []
        };
    },

    serialize: function serialize() {
        var iteration = 0;
        // TODO: Lolololol, we need to count how many nodes there are
        // and use that as our upper bound
        var refLength = 20;

        // Build the object of inputs
        var nodes = (0, _helpersValues2['default'])(this.refs || {}).filter(function (ref) {
            return ref.getInputs || ref.getValue;
        }).map(function (ref) {
            return ref.getInputs ? ref.getInputs() : { ref: ref };
        });

        var form = getBlankForm();
        var oldForm = getBlankForm();

        do {
            // Keep a copy of the previous iteration of the form so we can
            // detect if the form is stable to exit early
            oldForm = _extends({}, form);
            form.fieldValues = nodeToValues(nodes);

            var _toErrors = toErrors(nodes, form.fieldValues, form.fieldErrors, form);

            var fieldErrors = _toErrors.fieldErrors;
            var errors = _toErrors.errors;

            form.fieldErrors = fieldErrors;
            form.errors = errors;
            iteration++;
        } while (this.props.circular && iteration < refLength && JSON.stringify(form) !== JSON.stringify(oldForm));

        // Update valid here so our formValidators can make use of it
        form.valid = !form.errors.length;

        var formValidators = [].concat(this.props.validators || [], this.validators || []);
        var formErrors = formValidators.map(function (fn) {
            return fn(form);
        });

        form.errors = (0, _helpersUniq2['default'])(form.errors.concat(formErrors));
        form.valid = !form.errors.length;

        return form;
    },

    onChange: function onChange() {
        this.props.onChange(this.serialize());
        if (this.props.showErrorsOnChange) {
            this.showFieldErrors();
        }
    },

    onSubmit: function onSubmit(event) {
        event && event.preventDefault && event.preventDefault();
        if (this.props.showErrorsOnSubmit) {
            this.showFieldErrors();
        }
        this.props.onSubmit(this.serialize());
    },

    onKeyDown: function onKeyDown(event) {
        if (event.key === 'Enter') {
            this.onSubmit(event);
        }
    },

    showFieldErrors: function showFieldErrors() {
        var _serialize = this.serialize();

        var fieldErrors = _serialize.fieldErrors;
        var errors = _serialize.errors;

        this.setState({ errors: errors, fieldErrors: fieldErrors });
        return errors;
    },

    clearFieldErrors: function clearFieldErrors() {
        this.setState({
            fieldErrors: {},
            errors: []
        });
    },

    render: function render() {
        var errorsRule = (0, _helpersCloneChildren.createErrorsRule)(this.state);
        var formableRule = (0, _helpersCloneChildren.createFormableRule)(this.state, this.onSubmit, this.onChange);

        return _react2['default'].createElement(
            'form',
            _extends({}, this.props, {
                ref: 'form',
                onSubmit: this.onSubmit,
                onChange: function () {},
                onKeyDown: this.onKeyDown }),
            (0, _helpersCloneChildren2['default'])([errorsRule, formableRule], this.props.children)
        );
    }
});

},{"./helpers/cloneChildren":6,"./helpers/identity":10,"./helpers/uniq":12,"./helpers/values":13,"react":undefined}],6:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createErrorsRule = createErrorsRule;
exports.createFormableRule = createFormableRule;
exports['default'] = cloneChildren;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _identity = require('./identity');

var _identity2 = _interopRequireDefault(_identity);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

/**
 * Rule for cloning something at leaf level like some text
 */
var leafRule = {
    predicate: function predicate(child) {
        return typeof child !== 'object' || child === null;
    },
    clone: _identity2['default']
};

/**
 * Allows default recursion into an element that has children.
 *
 * @param {array} rules on how to clone individual elements
 * @returns {Object} rule for cloning recursively
 */
function createRecursiveRule(rules) {
    return {
        predicate: function predicate() {
            return true;
        },
        clone: function clone(child, childNames) {
            return _react2['default'].cloneElement(child, {}, cloneChildren(rules, child.props && child.props.children, childNames));
        }
    };
}

/**
 * A common function for cloning Errors element that takes care of injecting
 * required error data
 *
 * @param {array} errors of the form
 * @param {Object} fieldErrors of the form
 * @return {Object} rule for cloning Errors element
 */

function createErrorsRule(_ref) {
    var _ref$errors = _ref.errors;
    var errors = _ref$errors === undefined ? [] : _ref$errors;
    var _ref$fieldErrors = _ref.fieldErrors;
    var fieldErrors = _ref$fieldErrors === undefined ? {} : _ref$fieldErrors;

    return {
        predicate: function predicate(child) {
            return child.type && child.type.displayName === 'Errors';
        },
        clone: function clone(child) {
            return _react2['default'].cloneElement(child, {
                errors: errors,
                fieldErrors: fieldErrors
            }, child.props && child.props.children);
        }
    };
}

/*
 * Get extra properties for something we are going to weave our formable magic into.
 */
function getFormableComponentProperties(errors, fieldErrors, onSubmit, onChange) {
    return function (child, childNames) {
        (0, _warning2['default'])(!child.ref, 'Attempting to attach ref "' + child.ref + '" to "' + child.props.name + '" will be bad for your health');
        (0, _warning2['default'])(childNames.indexOf(child.props.name) === -1, 'Duplicate name "' + child.props.name + '" found. Duplicate fields will be ignored');
        childNames.push(child.props.name);

        return {
            ref: child.ref || child.props.name,
            onChange: (0, _compose2['default'])(onChange, child.props.onChange || _identity2['default']),
            onSubmit: (0, _compose2['default'])(onSubmit, child.props.onSubmit || _identity2['default']),
            errors: errors,
            fieldErrors: child.props.fieldErrors || fieldErrors[child.props.name]
        };
    };
}

/*
 * Standard cloning rule for something react-formable
 */

function createFormableRule(_ref2) {
    var onSubmit = arguments.length <= 1 || arguments[1] === undefined ? _identity2['default'] : arguments[1];
    var _ref2$errors = _ref2.errors;
    var errors = _ref2$errors === undefined ? [] : _ref2$errors;
    var _ref2$fieldErrors = _ref2.fieldErrors;
    var fieldErrors = _ref2$fieldErrors === undefined ? {} : _ref2$fieldErrors;
    var onChange = arguments.length <= 2 || arguments[2] === undefined ? _identity2['default'] : arguments[2];

    return {
        predicate: function predicate(child) {
            return child.props && child.props.name;
        },
        clone: function clone(child, childNames) {
            return _react2['default'].cloneElement(child, getFormableComponentProperties(errors, fieldErrors, onSubmit, onChange)(child, childNames), child.props && child.props.children);
        }
    };
}

/**
 * Clones a child subtree using the supplied rules which are composed of predicates
 * and clone instructions.
 *
 * @param  {array} rules used to predicate and clone
 * @param  {Function} children The children to iterate over
 * @param  {array=} childNames optionally and ONLY supplied for internal recursion
 * @return {Object} The cloned children
 */

function cloneChildren(rules, children) {
    var childNames = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    if (children) {
        var _ret = (function () {
            var cloneRules = [leafRule].concat(_toConsumableArray(rules), [createRecursiveRule(rules)]);

            return {
                v: _react2['default'].Children.map(children, function (child) {
                    // find first rule that passes and use it to clone
                    return cloneRules.find(function (rule) {
                        return rule.predicate(child);
                    }).clone(child, childNames);
                })
            };
        })();

        if (typeof _ret === 'object') return _ret.v;
    }
}

},{"./compose":7,"./identity":10,"react":undefined,"warning":1}],7:[function(require,module,exports){
/*eslint func-style:0*/

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = compose;

function compose(f2, f1) {
    return function () {
        return f2(f1.apply(undefined, arguments));
    };
}

module.exports = exports["default"];

},{}],8:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = deepFind;

function deepFind(obj, path) {
    var paths = path.split('.');
    var current = obj,
        i = undefined;

    for (i = 0; i < paths.length; ++i) {
        if (current[paths[i]] == undefined) {
            return undefined;
        }
        current = current[paths[i]];
    }
    return current;
}

module.exports = exports['default'];

},{}],9:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = flatten;

function flatten(arr) {
    return [].concat.apply([], arr);
}

module.exports = exports["default"];

},{}],10:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = identity;

function identity(x) {
    return x;
}

module.exports = exports["default"];

},{}],11:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = isNil;

function isNil(x) {
    return x == null;
}

module.exports = exports["default"];

},{}],12:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = uniq;

function uniq(arr) {
    return arr.reduce(function (memo, item) {
        return memo.indexOf(item) === -1 ? memo.concat(item) : memo;
    }, []);
}

module.exports = exports["default"];

},{}],13:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = values;

function values(obj) {
    var ret = [];

    for (var key in obj) {
        ret = ret.concat(obj[key]);
    }
    return ret;
}

module.exports = exports["default"];

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var identity = function identity(x) {
    return x;
};

exports['default'] = _react2['default'].createClass({
    displayName: 'input',

    propTypes: {
        fieldErrors: _react.PropTypes.arrayOf(_react.PropTypes.string),
        validateOnBlur: _react.PropTypes.bool,
        onChange: _react.PropTypes.func,
        onSubmit: _react.PropTypes.func,
        className: _react.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: identity,
            onSubmit: identity,
            className: ''
        };
    },

    getValue: function getValue() {
        return this.refs.input.value;
    },

    onChange: function onChange(e) {
        if (!this.props.validateOnBlur) {
            this.props.onChange(e);
        }
    },

    onBlur: function onBlur() {
        if (this.props.validateOnBlur) {
            this.props.onChange();
        }
    },

    render: function render() {
        var hasError = this.props.fieldErrors && this.props.fieldErrors.length;
        var className = this.props.className + ' ' + (hasError ? 'error' : '');

        return _react2['default'].createElement('input', _extends({}, this.props, {
            className: className,
            onChange: this.onChange,
            onBlur: this.onBlur,
            ref: 'input' }));
    }
});
module.exports = exports['default'];

},{"react":undefined}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = required;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersDeepFind = require('../helpers/deepFind');

var _helpersDeepFind2 = _interopRequireDefault(_helpersDeepFind);

/*eslint func-style:0*/

function required(equalsField, errorMessage) {
    return function (value, fieldValues) {
        if ((0, _helpersDeepFind2['default'])(fieldValues, equalsField) !== value) {
            return errorMessage;
        }
    };
}

module.exports = exports['default'];

},{"../helpers/deepFind":8}],16:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = greaterThan;

function greaterThan(greaterThanValue, errorMessage) {
    return function (value) {
        if (parseFloat(value) <= greaterThanValue) {
            return errorMessage;
        }
    };
}

module.exports = exports["default"];

},{}],17:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = lessThan;

function lessThan(lessThanValue, errorMessage) {
    return function (value) {
        if (parseFloat(value) >= lessThanValue) {
            return errorMessage;
        }
    };
}

module.exports = exports["default"];

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = maxLength;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersIsNil = require('../helpers/isNil');

var _helpersIsNil2 = _interopRequireDefault(_helpersIsNil);

/*eslint func-style:0*/

function maxLength(maxLength, errorMessage) {
    return function (value) {
        if ((0, _helpersIsNil2['default'])(value) || value.length > maxLength) {
            return errorMessage;
        }
    };
}

module.exports = exports['default'];

},{"../helpers/isNil":11}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = minLength;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersIsNil = require('../helpers/isNil');

var _helpersIsNil2 = _interopRequireDefault(_helpersIsNil);

/*eslint func-style:0*/

function minLength(minLength, errorMessage) {
    return function (value) {
        if ((0, _helpersIsNil2['default'])(value) || value.length < minLength) {
            return errorMessage;
        }
    };
}

module.exports = exports['default'];

},{"../helpers/isNil":11}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = required;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersIsNil = require('../helpers/isNil');

var _helpersIsNil2 = _interopRequireDefault(_helpersIsNil);

function emptyString(value) {
    return !value.trim().length;
}

function emptyObject(value) {
    return !Object.keys(value).length;
}

/*eslint func-style:0*/

function required(errorMessage) {
    return function (value) {
        if ((0, _helpersIsNil2['default'])(value)) {
            return errorMessage;
        }
        if (typeof value === 'string' && emptyString(value)) {
            return errorMessage;
        } else if (typeof value === 'object' && emptyObject(value)) {
            return errorMessage;
        }
    };
}

module.exports = exports['default'];

},{"../helpers/isNil":11}],21:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = test;

function test(regexp, errorMessage) {
    return function (value) {
        var r = regexp && regexp.test ? regexp : new RegExp(regexp);

        if (!r.test(value)) {
            return errorMessage;
        }
    };
}

module.exports = exports["default"];

},{}],"react-formable":[function(require,module,exports){
// Components
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _fieldset = require('./fieldset');

var _fieldset2 = _interopRequireDefault(_fieldset);

var _fieldlist = require('./fieldlist');

var _fieldlist2 = _interopRequireDefault(_fieldlist);

var _inputsInput = require('./inputs/input');

var _inputsInput2 = _interopRequireDefault(_inputsInput);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

// Validators

var _validatorsRequired = require('./validators/required');

var _validatorsRequired2 = _interopRequireDefault(_validatorsRequired);

var _validatorsGreaterThan = require('./validators/greaterThan');

var _validatorsGreaterThan2 = _interopRequireDefault(_validatorsGreaterThan);

var _validatorsLessThan = require('./validators/lessThan');

var _validatorsLessThan2 = _interopRequireDefault(_validatorsLessThan);

var _validatorsMaxLength = require('./validators/maxLength');

var _validatorsMaxLength2 = _interopRequireDefault(_validatorsMaxLength);

var _validatorsMinLength = require('./validators/minLength');

var _validatorsMinLength2 = _interopRequireDefault(_validatorsMinLength);

var _validatorsTest = require('./validators/test');

var _validatorsTest2 = _interopRequireDefault(_validatorsTest);

var _validatorsEqualsField = require('./validators/equalsField');

var _validatorsEqualsField2 = _interopRequireDefault(_validatorsEqualsField);

var validators = { required: _validatorsRequired2['default'], greaterThan: _validatorsGreaterThan2['default'], lessThan: _validatorsLessThan2['default'], maxLength: _validatorsMaxLength2['default'], minLength: _validatorsMinLength2['default'], test: _validatorsTest2['default'], equalsField: _validatorsEqualsField2['default'] };

exports.Form = _form2['default'];
exports.getBlankForm = _form.getBlankForm;
exports.Fieldset = _fieldset2['default'];
exports.Fieldlist = _fieldlist2['default'];
exports.Input = _inputsInput2['default'];
exports.Errors = _errors2['default'];
exports.validators = validators;
exports['default'] = _form2['default'];

},{"./errors":2,"./fieldlist":3,"./fieldset":4,"./form":5,"./inputs/input":14,"./validators/equalsField":15,"./validators/greaterThan":16,"./validators/lessThan":17,"./validators/maxLength":18,"./validators/minLength":19,"./validators/required":20,"./validators/test":21}]},{},[]);
