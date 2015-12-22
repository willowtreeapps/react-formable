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
        renderError: _react.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            errors: [],
            additionalErrors: [],
            fieldErrors: [],
            scoped: false,
            renderError: _helpersIdentity2['default']
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

        return _react2['default'].createElement(
            'ul',
            _extends({ className: 'errors' }, this.props),
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

},{"./helpers/flatten":8,"./helpers/identity":9,"./helpers/values":11,"react":undefined}],3:[function(require,module,exports){
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

},{"./fieldset":4,"./helpers/values":11,"react":undefined,"warning":1}],4:[function(require,module,exports){
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

var _helpersIdentity = require('./helpers/identity');

var _helpersIdentity2 = _interopRequireDefault(_helpersIdentity);

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
        var _this = this;

        (0, _warning2['default'])(this.props.name, 'Fieldset found without a name prop. The children of this component will behave eratically');

        var fieldErrors = this.props.fieldErrors || {};
        var childNames = [];

        var clonePred = function clonePred(child) {
            return child.props && child.props.name || child.type.displayName === 'Errors';
        };
        var cloneProps = function cloneProps(child) {
            if (child.type.displayName === 'Errors') {
                return {
                    errors: _this.props.errors,
                    fieldErrors: _this.props.fieldErrors || {}
                };
            }

            (0, _warning2['default'])(!child.ref, 'Attempting to attach ref "' + child.ref + '" to "' + child.props.name + '" will be bad for your health');
            (0, _warning2['default'])(childNames.indexOf(child.props.name) === -1, 'Duplicate name "' + child.props.name + '" found. Duplicate fields will be ignored');
            childNames = childNames.concat(child.props.name);

            return {
                ref: child.ref || child.props.name,
                errors: _this.props.errors,
                fieldErrors: child.props.fieldErrors || fieldErrors[child.props.name],
                onChange: child.props.onChange || _helpersIdentity2['default'],
                onSubmit: child.props.onSubmit || _helpersIdentity2['default']
            };
        };

        return _react2['default'].createElement(
            'div',
            this.props,
            (0, _helpersCloneChildren2['default'])(clonePred, cloneProps, this.props.children)
        );
    }
});
module.exports = exports['default'];

},{"./helpers/cloneChildren":6,"./helpers/identity":9,"./helpers/values":11,"react":undefined,"warning":1}],5:[function(require,module,exports){
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

var _helpersCompose = require('./helpers/compose');

var _helpersCompose2 = _interopRequireDefault(_helpersCompose);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

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
        var _this = this;

        // Define our helpers for cloneing our children
        var childNames = [];
        var clonePred = function clonePred(child) {
            return child.props && child.props.name || child.type.displayName === 'Errors';
        };
        var cloneProps = function cloneProps(child) {
            if (child.type.displayName === 'Errors') {
                return {
                    errors: _this.state.errors,
                    fieldErrors: _this.state.fieldErrors
                };
            }

            (0, _warning2['default'])(!child.ref, 'Attempting to attach ref "' + child.ref + '" to "' + child.props.name + '" will be bad for your health');
            (0, _warning2['default'])(childNames.indexOf(child.props.name) === -1, 'Duplicate name "' + child.props.name + '" found. Duplicate fields will be ignored');
            childNames = childNames.concat(child.props.name);

            return {
                ref: child.ref || child.props.name,
                onChange: (0, _helpersCompose2['default'])(child.props.onChange || _helpersIdentity2['default'], _this.onChange),
                onSubmit: (0, _helpersCompose2['default'])(child.props.onSubmit || _helpersIdentity2['default'], _this.onSubmit),
                errors: _this.state.errors,
                fieldErrors: child.props.fieldErrors || _this.state.fieldErrors[child.props.name]
            };
        };

        return _react2['default'].createElement(
            'form',
            _extends({}, this.props, {
                ref: 'form',
                onSubmit: this.onSubmit,
                onChange: function () {},
                onKeyDown: this.onKeyDown }),
            (0, _helpersCloneChildren2['default'])(clonePred, cloneProps, this.props.children)
        );
    }
});

},{"./helpers/cloneChildren":6,"./helpers/compose":7,"./helpers/identity":9,"./helpers/uniq":10,"./helpers/values":11,"react":undefined,"warning":1}],6:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = cloneChildren;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * Clones a child subtree, when we encounter a component that passes our
 * predicate pass it down additional props.
 *
 * @param  {Function} predicate A predicate function which recives the child
 * @param  {Function} getProps  A function which recives the component and
 * returns an object which gets merged into the props of the component
 * @param  {Function} children The children to iterate over
 * @return {Object} The cloned children
 */

function cloneChildren(predicate, getProps, children) {
    if (typeof children !== 'object' || children === null) {
        return children;
    }

    return _react2['default'].Children.map(children, function (child) {
        if (typeof child !== 'object' || child === null) {
            return child;
        }

        if (predicate(child)) {
            return _react2['default'].cloneElement(child, getProps(child), child.props && child.props.children);
        }

        return _react2['default'].cloneElement(child, {}, cloneChildren(predicate, getProps, child.props && child.props.children));
    });
}

module.exports = exports['default'];

},{"react":undefined}],7:[function(require,module,exports){
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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = flatten;

function flatten(arr) {
    return [].concat.apply([], arr);
}

module.exports = exports["default"];

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"react":undefined}],"react-formable":[function(require,module,exports){
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

exports.Form = _form2['default'];
exports.getBlankForm = _form.getBlankForm;
exports.Fieldset = _fieldset2['default'];
exports.Fieldlist = _fieldlist2['default'];
exports.Input = _inputsInput2['default'];
exports.Errors = _errors2['default'];
exports['default'] = _form2['default'];

},{"./errors":2,"./fieldlist":3,"./fieldset":4,"./form":5,"./inputs/input":12}]},{},[]);
