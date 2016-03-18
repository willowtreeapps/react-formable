require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _historyLibCreateHashHistory = require('history/lib/createHashHistory');

var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var history = (0, _historyLibCreateHashHistory2['default'])({
    queryKey: false
});

(0, _reactDom.render)(_react2['default'].createElement(
    _reactRouter.Router,
    { history: history },
    _routes2['default']
), document.getElementById('app'));

},{"./routes":49,"history/lib/createHashHistory":59,"react":undefined,"react-dom":undefined,"react-router":undefined}],2:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = JSONViewer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

function JSONViewer(_ref) {
    var data = _ref.data;

    return _react2['default'].createElement(
        _code2['default'],
        null,
        JSON.stringify(data, null, 2)
    );
}

JSONViewer.propTypes = {
    data: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];

},{"./code":3,"react":undefined}],3:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Code;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function Code(_ref) {
    var children = _ref.children;

    var html = window.hljs.highlightAuto(children).value;

    return _react2['default'].createElement('pre', { dangerouslySetInnerHTML: { __html: html } });
}

Code.propTypes = {
    children: _react.PropTypes.node.isRequired
};
module.exports = exports['default'];

},{"react":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _JSONViewer = require('./JSONViewer');

var _JSONViewer2 = _interopRequireDefault(_JSONViewer);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

var _reactFormable = require('react-formable');

exports['default'] = _react2['default'].createClass({
    displayName: 'formExample',

    propTypes: {
        code: _react.PropTypes.string.isRequired,
        example: _react.PropTypes.func.isRequired,
        className: _react.PropTypes.string,
        showCodeByDefault: _react.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },

    getInitialState: function getInitialState() {
        return {
            showCode: this.props.showCodeByDefault || false,
            form: (0, _reactFormable.getBlankForm)()
        };
    },

    render: function render() {
        var _this = this;

        var Example = this.props.example;

        return _react2['default'].createElement(
            'div',
            { className: this.props.className + ' code-example' },
            _react2['default'].createElement(
                'span',
                { className: 'a', onClick: function () {
                        return _this.setState({ showCode: !_this.state.showCode });
                    } },
                this.state.showCode ? 'Show Result' : 'Show Code'
            ),
            this.state.showCode && _react2['default'].createElement(
                _code2['default'],
                null,
                this.props.code
            ),
            !this.state.showCode && _react2['default'].createElement(
                'div',
                { className: 'split' },
                _react2['default'].createElement(
                    'div',
                    { className: 'left' },
                    _react2['default'].createElement(Example, { onChange: function (form) {
                            return _this.setState({ form: form });
                        } })
                ),
                _react2['default'].createElement(_JSONViewer2['default'], { data: this.state.form })
            )
        );
    }
});
module.exports = exports['default'];

},{"./JSONViewer":2,"./code":3,"react":undefined,"react-formable":undefined}],5:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = GHLogo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function GHLogo() {
    return _react2["default"].createElement(
        "a",
        { className: "gh-logo",
            href: "https://github.com/willowtreeapps/react-formable",
            target: "_blank" },
        _react2["default"].createElement("i", { className: "fa fa-github" })
    );
}

module.exports = exports["default"];

},{"react":undefined}],6:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = MarkdownViewer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

_marked2['default'].setOptions({
    highlight: function highlight(code) {
        return window.hljs.highlightAuto(code).value;
    }
});

function MarkdownViewer(props) {
    var html = (0, _marked2['default'])(props.text || props.children || '', { sanitize: true });
    var children = props.children;

    var divProps = _objectWithoutProperties(props, ['children']);

    return _react2['default'].createElement('div', _extends({}, divProps, { dangerouslySetInnerHTML: { __html: html } }));
}

MarkdownViewer.propTypes = {
    text: _react.PropTypes.string,
    children: _react.PropTypes.node
};
module.exports = exports['default'];

},{"marked":67,"react":undefined}],7:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Page;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md = require('./md');

var _md2 = _interopRequireDefault(_md);

var _subsection = require('./subsection');

var _subsection2 = _interopRequireDefault(_subsection);

function Page(props) {
    var _props$title = props.title;
    var title = _props$title === undefined ? '' : _props$title;
    var _props$className = props.className;
    var className = _props$className === undefined ? '' : _props$className;
    var description = props.description;
    var _props$subsections = props.subsections;
    var subsections = _props$subsections === undefined ? [] : _props$subsections;
    var setActiveSublink = props.setActiveSublink;

    return _react2['default'].createElement(
        'div',
        { className: className + ' page' },
        title && title.length && _react2['default'].createElement(
            'h1',
            null,
            title
        ),
        description && _react2['default'].createElement(_md2['default'], { text: description }),
        subsections.map(function (subsection, i) {
            return _react2['default'].createElement(_subsection2['default'], _extends({ key: i }, subsection, {
                setActiveSublink: setActiveSublink }));
        })
    );
}

Page.propTypes = {
    className: _react.PropTypes.string,
    title: _react.PropTypes.string,
    description: _react.PropTypes.string,
    subsections: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        title: _react.PropTypes.string,
        content: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]))
    })),
    setActiveSublink: _react.PropTypes.func
};
module.exports = exports['default'];

},{"./md":6,"./subsection":8,"react":undefined}],8:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Subsection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md = require('./md');

var _md2 = _interopRequireDefault(_md);

var _reactWaypoint = require('react-waypoint');

var _reactWaypoint2 = _interopRequireDefault(_reactWaypoint);

/*
 * Represents some site content
 */

function Subsection(props) {
    var _props$title = props.title;
    var title = _props$title === undefined ? '' : _props$title;
    var link = props.link;
    var _props$subsections = props.subsections;
    var subsections = _props$subsections === undefined ? [] : _props$subsections;
    var content = props.content;
    var setActiveSublink = props.setActiveSublink;

    return _react2['default'].createElement(
        'div',
        { id: link, className: 'subsection' },
        _react2['default'].createElement(_reactWaypoint2['default'], { onEnter: function () {
                return setActiveSublink(link);
            } }),
        title && title.length && _react2['default'].createElement(
            'h3',
            null,
            title
        ),
        content && content.map(function (Content, i) {
            if (typeof Content === 'string') {
                return _react2['default'].createElement(_md2['default'], { key: i, text: Content });
            }
            if (typeof Content === 'function') {
                return _react2['default'].createElement(Content, { key: i });
            }
        }),
        subsections.map(function (subsection) {
            return _react2['default'].createElement(Subsection, _extends({ key: subsection.link,
                setActiveSublink: setActiveSublink
            }, subsection));
        })
    );
}

Subsection.propTypes = {
    title: _react.PropTypes.string,
    id: _react.PropTypes.string,
    link: _react.PropTypes.string,
    content: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string])),
    subsections: _react.PropTypes.array,
    setActiveSublink: _react.PropTypes.func
};
module.exports = exports['default'];

},{"./md":6,"react":undefined,"react-waypoint":69}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Well;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/*eslint func-style:0*/

function Well(props) {
    return _react2['default'].createElement(
        'div',
        _extends({}, props, { className: props.className + ' well' }),
        props.children
    );
}

Well.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string
};

Well.defaultProps = {
    className: ''
};
module.exports = exports['default'];

},{"react":undefined}],10:[function(require,module,exports){
/*eslint func-style:0*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = GHLogo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function GHLogo() {
    return _react2["default"].createElement(
        "a",
        { className: "wt-logo",
            href: "http://willowtreeapps.com/",
            target: "_blank" },
        _react2["default"].createElement("img", { src: "./imgs/willowtree-logo@2x.png" })
    );
}

module.exports = exports["default"];

},{"react":undefined}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsPage = require('../../components/page');

var _componentsPage2 = _interopRequireDefault(_componentsPage);

var _subsectionsForm = require('./subsections/form');

var Form = _interopRequireWildcard(_subsectionsForm);

var _subsectionsFieldset = require('./subsections/fieldset');

var Fieldset = _interopRequireWildcard(_subsectionsFieldset);

var _subsectionsFieldlist = require('./subsections/fieldlist');

var Fieldlist = _interopRequireWildcard(_subsectionsFieldlist);

var _subsectionsInput = require('./subsections/input');

var Input = _interopRequireWildcard(_subsectionsInput);

var _subsectionsErrors = require('./subsections/errors');

var Errors = _interopRequireWildcard(_subsectionsErrors);

var _subsectionsValidatorsValidators = require('./subsections/validators/validators');

var Validators = _interopRequireWildcard(_subsectionsValidatorsValidators);

var subsections = [Form, Fieldset, Fieldlist, Input, Errors, Validators];

exports['default'] = _react2['default'].createClass({
    displayName: 'api',

    propTypes: {
        children: _react.PropTypes.node,
        setSublinks: _react.PropTypes.func,
        setActiveSublink: _react.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { title: 'API',
            className: 'api',
            subsections: subsections,
            setActiveSublink: this.props.setActiveSublink });
    }
});
module.exports = exports['default'];

},{"../../components/page":7,"./subsections/errors":12,"./subsections/fieldlist":13,"./subsections/fieldset":14,"./subsections/form":15,"./subsections/input":16,"./subsections/validators/validators":24,"react":undefined}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nA component which soaks up and displays form errors. You can think of `Errors` like it is a placeholder. Wherever you place it, errors will be rendered there.\n\n**NB**: Make sure to place this component *within* the `Form` tag.\n\n| Property | Type | Default | Description |\n| :------- | :--- | :------ | :---------- |\n| scoped | boolean | false | **EXPERIMENTAL:** Only displays form errors in relation to the elements nearest parent. |\n| additionalErrors | array[string] | [] | Any additional errors you would want to render to the screen can be passed down as an array of strings. |\n| renderError | function(error) => node | identity | If you want to overwrite how errors are rendered, you can do so by providing a callback to errors. This function will receive each error and will return what you want to be rendered as your error. |\n';

var content = [markdown];
exports.content = content;
var title = 'Errors';
exports.title = title;
var link = 'errors';
exports.link = link;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\n`Fieldlist` uses `Fieldset` under the hood to render each *direct* child it owns. This means if you nest `Fieldset`s within a `Fieldlist`, you will get some extra objects floating around. Similarly to `Fieldset`, validators return the subtree that the `Fieldlist` represents.\n\n| Property | Type | Default| Description |\n| :------- | :--- | :----- | :---------- |\n| validators | array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input. |\n| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |\n';

var content = [markdown];
exports.content = content;
var title = 'Fieldlist';
exports.title = title;
var link = 'fieldlist';
exports.link = link;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\n`Fieldset`s are where most of the magic happens. They let us group together similar fields into smaller bite-sized objects. We can use these within individual forms, or make reusable form components and use them all over the place.\n\nOne important thing to understand: `Fieldset`s will always make an object with the `name` provided. If you use a `Fieldset` within a `Fieldlist`, you will have a nested object with the name of the `Fieldset`.\n\nOne last thing to keep in mind: you can attach validators to `Fieldset`s. Instead of a primitive passed down as the first param, it will be the subtree that the `Fieldset` represents. Any errors returned from a `Fieldset`s validators will skip `fieldErrors` and go directly to `errors`.\n\n| Property | Type | Default | Description |\n| :------- | :--- | :------ | :---------- |\n| validators |array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input. |\n| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |\n\n';

var content = [markdown];
exports.content = content;
var title = 'Fieldset';
exports.title = title;
var link = 'fieldset';
exports.link = link;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nThe top level `Form` component is what serializes your data.\n\n| Property | Type | Default | Description |\n| :------- | :--- | :------ | :---------- |\n| onChange| function(form) | undefined | A callback which will be called whenever any child input changes. Receives the serialized form object. |\n| onSubmit | function(form) | undefined | A callback which will be called whenever the form is submitted. Receives the serialized form object. |\n| showErrorsOnSubmit | boolean | true | A boolean to decide if errors should be shown on submit. |\n| showErrorsOnChange | boolean(form) | false | A boolean to decide if errors should be shown on change. |\n| validators | array[function] | [] | An array of validators to run over the form. Useful to capture business logic. |\n| addValidationErrors | boolean | false | Add `fieldErrors` to your validators. This allows you to reference other components field errors within your validation methods as its last parameter. |\n\n\nThere are a handful of methods on the `Form` component which are useful. To access these, attach a `ref` to the `Form` and call them via `this.refs.refName.methodName();`.\n\n| Method | Params | Description |\n| :----- | :----- | :---------- |\n| serialize | | Returns the serialized form object. |\n| showFieldErrors | | Passes down errors to inputs within the form. |\n| clearFieldErrors | | Clears errors passed down to inputs within the form. |\n';

var content = [markdown];
exports.content = content;
var title = 'Form';
exports.title = title;
var link = 'form';
exports.link = link;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nTo integrate inputs with `Form`s, you need to ensure two things.\n\n1. The input has a `getValue` method. This method returns the current value of the input.\n2. The input has to be able to work with your `refs`. cUnfortunately, this means nostateless components.\n\n| Property | Type | Default | Description |\n| :------- | :--- | :------ | :---------- |\n| value | string | undefined | The value of the field. |\n| validators |array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input. |\n| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |\n| fieldErrors | array[string] | [] | An array of string errors to pass down to the input. This is automatically filled via the form. You can overwrite this field if you want to manually show an error on an input. |\n| validateOnBlur | boolean | false | A boolean which forces the field to wait until it fires a blur event to trigger form validation. |\n';

var content = [markdown];
exports.content = content;
var title = 'Input';
exports.title = title;
var link = 'input';
exports.link = link;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nA validator that ensures an input value is equal to another field in the form.\n\n```js\nconst { equalsField } = require(\'react-formable\').validators;\n<Input name=\'password\' validators={equalsField(\'password2\', \'passwords must match\')} ... />\n```\n\n| Parameter | Type | Description |\n| :------- | :--- | :---------- |\n| Field Name | string | name of another field value that this value must match (nesting available using dot notation). |\n| Error message | string | The error message returned is the supplied value does not match. |\n\n';

var content = [markdown];
exports.content = content;
var title = 'Equals Field';
exports.title = title;
var link = 'Equals Field';
exports.link = link;

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nA validator that ensures an input value is greater than pre-specified number.\n\n```js\nconst { greaterThan } = require(\'react-formable\').validators;\n<Input validators={greaterThan(5, \'value must be greater than 5\')} ... />\n```\n\n| Parameter | Type | Description |\n| :------- | :--- | :---------- |\n| floor | number | The number that values must be greater than. |\n| Error message | string | The error message returned is the supplied value is too small. |\n\n';

var content = [markdown];
exports.content = content;
var title = 'Greater Than';
exports.title = title;
var link = 'Greater Than';
exports.link = link;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nA validator that ensures an input value is less than a pre-specified number.\n\n```js\nconst { lessThan } = require(\'react-formable\').validators;\n<Input validators={lessThan(5, \'value must be less than 5\')} ... />\n```\n\n| Parameter | Type | Description |\n| :------- | :--- | :---------- |\n| ceiling | number | The number that values must be less than. |\n| Error message | string | The error message returned is the supplied value is too big. |\n\n';

var content = [markdown];
exports.content = content;
var title = 'Less Than';
exports.title = title;
var link = 'Less Than';
exports.link = link;

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nA validator that ensures maximum legnth of a supplied value.\n\n```js\nconst { maxLength } = require(\'react-formable\').validators;\n<Input validators={maxLength(12, \'password must be at most 12 characters\')} ... />\n```\n\n| Parameter | Type | Description |\n| :------- | :--- | :---------- |\n| Maximum Length | number | The maximum possible length of the value. |\n| Error message | string | The error message returned is the supplied value is too long. |\n\n';

var content = [markdown];
exports.content = content;
var title = 'Maximum Length';
exports.title = title;
var link = 'Maximum Length';
exports.link = link;

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nA validator that ensures minimum legnth of a supplied value.\n\n```js\nconst { minLength } = require(\'react-formable\').validators;\n<Input validators={minLength(8, \'password must be at least 8 characters\')} ... />\n```\n\n| Parameter | Type | Description |\n| :------- | :--- | :---------- |\n| Minimum Length | number | The minimum possible length of the value. |\n| Error message | string | The error message returned is the supplied value is too short. |\n\n';

var content = [markdown];
exports.content = content;
var title = 'Minimum Length';
exports.title = title;
var link = 'Minimum Length';
exports.link = link;

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nA validator that ensures an input value is supplied. Null, undefined, empty string (whitespace) or empty object `{}` are all considered missing.\n\n```js\nconst { required } = require(\'react-formable\').validators;\n<Input validators={required(\'field is required\')} ... />\n```\n\n| Parameter | Type | Description |\n| :------- | :--- | :---------- |\n| Error message | string | The error message to be returned is the supplied value is missing. |\n\n';

var content = [markdown];
exports.content = content;
var title = 'Required';
exports.title = title;
var link = 'Required';
exports.link = link;

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var markdown = '\nA validator that ensures the input value meets the specified regex.\n\n```js\nconst { test } = require(\'react-formable\').validators;\n<Input validators={test(/(^d{5}$)/, \'must supply zip code\')} ... />\n```\n\n| Parameter | Type | Description |\n| :------- | :--- | :---------- |\n| Regexp | string/regex | The regex that the value must match. |\n| Error message | string | The error message to be returned is the supplied value is missing. |\n\n';

var content = [markdown];
exports.content = content;
var title = 'Regex';
exports.title = title;
var link = 'Regex';
exports.link = link;

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _subsectionsRequired = require('./subsections/required');

var Required = _interopRequireWildcard(_subsectionsRequired);

var _subsectionsTest = require('./subsections/test');

var Test = _interopRequireWildcard(_subsectionsTest);

var _subsectionsLessThan = require('./subsections/lessThan');

var LessThan = _interopRequireWildcard(_subsectionsLessThan);

var _subsectionsGreaterThan = require('./subsections/greaterThan');

var GreaterThan = _interopRequireWildcard(_subsectionsGreaterThan);

var _subsectionsMinLength = require('./subsections/minLength');

var MinLength = _interopRequireWildcard(_subsectionsMinLength);

var _subsectionsMaxLength = require('./subsections/maxLength');

var MaxLength = _interopRequireWildcard(_subsectionsMaxLength);

var _subsectionsEqualsField = require('./subsections/equalsField');

var EqualsField = _interopRequireWildcard(_subsectionsEqualsField);

var subsections = [Required, Test, LessThan, GreaterThan, MinLength, MaxLength, EqualsField];

exports.subsections = subsections;
var markdown = '\nA validator is a function that can be supplied to a `<Input />`, `<Fieldset />` `<Fieldlist />` or a `<Form />`. These validators will run against with the supplied form value(s) to determine the validity of the component.\n\nA validator is supplied via the property `validators` which expects an array of functions like the one below which checks the user has typed `red`.\n\n```js\n<Input name="red" type="text"\n       validators={[\n           (value) => {\n               if (value === \'red\') {\n                   return \'Hosuton we have a problem\';\n               }\n           }\n       ]} />\n```\n\nThese functions have the following call signatures. Note, `fieldErrors` will only be present if `addValidationErrors` is true on the `Form` component. `fieldErrors` and `fieldValues` are the values you recive when serialize the form.\n\n| Component | Params | Description |\n| :----- | :----- | :---------- |\n| Inputs | value: Number String Boolean, fieldValues: Object, fieldErrors? : Object | Here the value is the input\'s value |\n| Fieldset | value: Object, fieldValues: Object, fieldErrors?: Object | A fieldset recives a value of all its children in object form |\n| Fieldlist | value: Array, fieldValues: Object, fieldErrors?: Object | A fieldlist recives a value of a list of its children |\n| Form | value: Object, fieldValues: Object, fieldErrors?: Object | Value here is all the values within the form |\n\nReturning a message from a validator indicates a fail. Returning nothing indicates a pass.\n\n`react-formable` supplies some common use-case stock validators which you can import and use list below.\n';

var content = [markdown];
exports.content = content;
var title = 'Validators';
exports.title = title;
var link = 'Validators';
exports.link = link;

},{"./subsections/equalsField":17,"./subsections/greaterThan":18,"./subsections/lessThan":19,"./subsections/maxLength":20,"./subsections/minLength":21,"./subsections/required":22,"./subsections/test":23}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _sidebar = require('./sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var headerHeight = 88;
var footerHeight = 160;

var links = [{ link: 'getting-started', title: 'Getting Started' }, { link: 'guides', title: 'Guides' }, { link: 'examples', title: 'Examples' }, { link: 'api', title: 'API' }];

var documentHeight = function documentHeight() {
    return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
};

exports['default'] = _react2['default'].createClass({
    displayName: 'base',

    propTypes: {
        children: _react.PropTypes.node,
        location: _react.PropTypes.object
    },

    getInitialState: function getInitialState() {
        return {
            subLinks: [],
            activeSublink: ''
        };
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        window.addEventListener('scroll', function () {
            return _this.forceUpdate();
        });
        window.addEventListener('resize', function () {
            return _this.forceUpdate();
        });

        // TODO: On the index route the sidebar doesn't render correctly.
        // This hack keeps it rendering... for now.
        window.scrollTo(1, 1);
    },

    componentDidUnMount: function componentDidUnMount() {
        var _this2 = this;

        window.removeEventListener('scroll', function () {
            return _this2.forceUpdate();
        });
        window.removeEventListener('resize', function () {
            return _this2.forceUpdate();
        });
    },

    setSublinks: function setSublinks(subLinks) {
        this.setState({ subLinks: subLinks });
    },

    setActiveSublink: function setActiveSublink(activeSublink) {
        this.setState({ activeSublink: activeSublink });
    },

    render: function render() {
        var scrollTop = window.pageYOffset;
        var totalHeight = documentHeight();
        var scrollBottom = window.innerHeight + window.pageYOffset;
        var headerVisible = headerHeight - scrollTop > 0;
        var footerVisible = totalHeight - scrollBottom < footerHeight;

        var style = {};

        style.position = headerVisible || footerVisible ? 'absolute' : 'fixed';
        if (footerVisible && !headerVisible) style.top = totalHeight - window.innerHeight - footerHeight - headerHeight;

        return _react2['default'].createElement(
            'div',
            { className: 'app', onScroll: this.onScroll },
            _react2['default'].createElement(_header2['default'], { links: links }),
            _react2['default'].createElement(
                'div',
                { style: { position: 'relative', minHeight: '100%' } },
                _react2['default'].createElement(_sidebar2['default'], { links: links,
                    subLinks: this.state.subLinks, style: style,
                    activePath: this.props.location.pathname,
                    activeSublink: this.state.activeSublink }),
                _react2['default'].createElement(
                    'div',
                    { className: 'app-content' },
                    _react2['default'].cloneElement(this.props.children, {
                        setSublinks: this.setSublinks,
                        setActiveSublink: this.setActiveSublink
                    })
                )
            ),
            _react2['default'].createElement(_footer2['default'], null)
        );
    }
});
module.exports = exports['default'];

},{"./footer":35,"./header":46,"./sidebar":48,"react":undefined}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsPage = require('../../components/page');

var _componentsPage2 = _interopRequireDefault(_componentsPage);

var _subsectionsBasic = require('./subsections/basic');

var Basic = _interopRequireWildcard(_subsectionsBasic);

var _subsectionsSignup = require('./subsections/signup');

var Signup = _interopRequireWildcard(_subsectionsSignup);

var _subsectionsFieldset = require('./subsections/fieldset');

var Fieldset = _interopRequireWildcard(_subsectionsFieldset);

var _subsectionsFieldlist = require('./subsections/fieldlist');

var Fieldlist = _interopRequireWildcard(_subsectionsFieldlist);

var subsections = [Basic, Signup, Fieldset, Fieldlist];

exports['default'] = _react2['default'].createClass({
    displayName: 'examples',

    propTypes: {
        children: _react.PropTypes.node,
        setSublinks: _react.PropTypes.func,
        setActiveSublink: _react.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { title: 'Examples',
            className: 'examples',
            subsections: subsections,
            setActiveSublink: this.props.setActiveSublink });
    }
});
module.exports = exports['default'];

},{"../../components/page":7,"./subsections/basic":28,"./subsections/fieldlist":30,"./subsections/fieldset":32,"./subsections/signup":34,"react":undefined}],27:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = BasicForm;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormable = require('react-formable');

var required = require('react-formable').validators.required;

function BasicForm(_ref) {
    var onChange = _ref.onChange;

    return _react2['default'].createElement(
        _reactFormable.Form,
        { onChange: onChange },
        _react2['default'].createElement(_reactFormable.Errors, { className: 'formErrors' }),
        _react2['default'].createElement(
            'label',
            null,
            'First name *',
            _react2['default'].createElement(_reactFormable.Input, { name: 'firstname',
                type: 'text',
                validators: [required('First name is required')] })
        ),
        _react2['default'].createElement(
            'label',
            null,
            'Last name *',
            _react2['default'].createElement(_reactFormable.Input, { name: 'lastname',
                type: 'text',
                validators: [required('Last name is required')] })
        ),
        _react2['default'].createElement(
            'label',
            null,
            'Phone number',
            _react2['default'].createElement(_reactFormable.Input, { name: 'phone', type: 'text' })
        ),
        _react2['default'].createElement('input', { type: 'submit', value: 'Submit' })
    );
}

BasicForm.propTypes = {
    onChange: _react.PropTypes.func
};

var source = "/*eslint func-style:0*/\nimport React, { PropTypes } from 'react';\nimport { Form, Input, Errors } from 'react-formable';\nconst { required } = require('react-formable').validators;\n\nexport default function BasicForm({ onChange }) {\n    return <Form onChange={onChange}>\n        <Errors className=\"formErrors\" />\n\n        <label>\n            First name *\n            <Input name=\"firstname\"\n                   type=\"text\"\n                   validators={[\n                       required('First name is required')\n                   ]} />\n        </label>\n\n        <label>\n            Last name *\n            <Input name=\"lastname\"\n                   type=\"text\"\n                   validators={[\n                       required('Last name is required')\n                   ]} />\n        </label>\n\n        <label>\n            Phone number\n            <Input name=\"phone\" type=\"text\" />\n        </label>\n\n        <input type=\"submit\" value=\"Submit\" />\n    </Form>;\n}\n\nBasicForm.propTypes = {\n    onChange: PropTypes.func\n};\n\nexport const source = require('fs').readFileSync(__filename, 'utf8');\n";
exports.source = source;

},{"react":undefined,"react-formable":undefined}],28:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsFormExample = require('../../../../components/formExample');

var _componentsFormExample2 = _interopRequireDefault(_componentsFormExample);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

var code = function code() {
  return _react2['default'].createElement(_componentsFormExample2['default'], { example: _code2['default'], code: _code.source });
};
var markdown = "Here is a simple form. It's got a couple of fields and a bit of validation, easy right?\n\nSooooo easy.\n";

var content = [markdown, code];
exports.content = content;
var title = 'Basic';
exports.title = title;
var link = 'basic';
exports.link = link;

},{"../../../../components/formExample":4,"./code":27,"react":undefined}],29:[function(require,module,exports){
/* eslint func-style:0 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormable = require('react-formable');

var required = require('react-formable').validators.required;

var FieldlistForm = _react2['default'].createClass({
    displayName: 'FieldlistForm',

    propTypes: {
        onChange: _react.PropTypes.func
    },

    getInitialState: function getInitialState() {
        return {
            uniqueTagId: 0,
            pets: []
        };
    },

    abandonPet: function abandonPet(tagId) {
        var _this = this;

        var pets = this.state.pets.slice().filter(function (petId) {
            return tagId !== petId;
        });

        this.setState({ pets: pets }, function () {
            return _this.refs.form.onChange();
        });
    },

    adoptPet: function adoptPet() {
        var _this2 = this;

        var tagId = this.state.uniqueTagId;
        var pets = this.state.pets.slice();

        pets.push(tagId);
        this.setState({ pets: pets, uniqueTagId: tagId + 1 }, function () {
            return _this2.refs.form.onChange();
        });
    },

    render: function render() {
        var _this3 = this;

        var petInputs = this.state.pets.map(function (tagId) {
            return _react2['default'].createElement(
                'div',
                { key: 'key-' + tagId },
                _react2['default'].createElement(
                    'label',
                    null,
                    'Pet Name *',
                    _react2['default'].createElement(_reactFormable.Input, { name: 'name',
                        type: 'text',
                        validators: [required('You must name your pet!')] }),
                    _react2['default'].createElement(
                        'span',
                        { className: 'a',
                            onClick: function () {
                                return _this3.abandonPet(tagId);
                            } },
                        'Abandon'
                    )
                )
            );
        });

        return _react2['default'].createElement(
            _reactFormable.Form,
            { ref: 'form', onChange: this.props.onChange },
            _react2['default'].createElement(_reactFormable.Errors, { className: 'formErrors' }),
            _react2['default'].createElement(_reactFormable.Input, { type: 'button',
                value: 'Adopt Pet',
                onClick: this.adoptPet }),
            _react2['default'].createElement(
                _reactFormable.Fieldlist,
                { name: 'pets' },
                petInputs
            ),
            _react2['default'].createElement('input', { type: 'submit', value: 'Submit' })
        );
    }
});

exports['default'] = FieldlistForm;
var source = "/* eslint func-style:0 */\nimport React, { PropTypes } from 'react';\nimport { Form, Input, Errors, Fieldlist } from 'react-formable';\nconst { required } = require('react-formable').validators;\n\nconst FieldlistForm = React.createClass({\n\n    propTypes: {\n        onChange: PropTypes.func\n    },\n\n    getInitialState() {\n        return {\n            uniqueTagId: 0,\n            pets: []\n        };\n    },\n\n    abandonPet(tagId) {\n        const pets = this.state.pets.slice().filter((petId) =>\n            tagId !== petId);\n\n        this.setState({ pets }, () => this.refs.form.onChange());\n    },\n\n    adoptPet() {\n        const tagId = this.state.uniqueTagId;\n        const pets = this.state.pets.slice();\n\n        pets.push(tagId);\n        this.setState({ pets, uniqueTagId: tagId + 1 }, () =>\n            this.refs.form.onChange());\n    },\n\n    render() {\n        const petInputs = this.state.pets.map((tagId) =>\n            <div key={`key-${tagId}`}>\n                <label>Pet Name *\n                    <Input name=\"name\"\n                           type=\"text\"\n                           validators={[\n                               required('You must name your pet!')\n                           ]} />\n                    <span className=\"a\"\n                          onClick={() => this.abandonPet(tagId)}>Abandon</span>\n                </label>\n            </div>);\n\n        return <Form ref=\"form\" onChange={this.props.onChange}>\n                <Errors className=\"formErrors\" />\n                <Input type=\"button\"\n                       value=\"Adopt Pet\"\n                       onClick={this.adoptPet} />\n                <Fieldlist name=\"pets\">{petInputs}</Fieldlist>\n                <input type=\"submit\" value=\"Submit\" />\n        </Form>;\n    }\n});\n\nexport default FieldlistForm;\nexport const source = require('fs').readFileSync(__filename, 'utf8');\n";
exports.source = source;

},{"react":undefined,"react-formable":undefined}],30:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsFormExample = require('../../../../components/formExample');

var _componentsFormExample2 = _interopRequireDefault(_componentsFormExample);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

var code = function code() {
  return _react2['default'].createElement(_componentsFormExample2['default'], { example: _code2['default'], code: _code.source });
};
var markdown = "A simple example that includes a `<Fieldlist />`.\n";

var content = [markdown, code];
exports.content = content;
var title = 'Fieldlist';
exports.title = title;
var link = 'Fieldlist';
exports.link = link;

},{"../../../../components/formExample":4,"./code":29,"react":undefined}],31:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = FieldsetForm;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormable = require('react-formable');

var required = require('react-formable').validators.required;

function FieldsetForm(_ref) {
    var onChange = _ref.onChange;

    return _react2['default'].createElement(
        _reactFormable.Form,
        { onChange: onChange },
        _react2['default'].createElement(_reactFormable.Errors, { className: 'formErrors' }),
        _react2['default'].createElement(
            'label',
            null,
            'Name',
            _react2['default'].createElement(_reactFormable.Input, { name: 'name',
                type: 'text',
                validators: [required('name is required')] })
        ),
        _react2['default'].createElement(
            'h4',
            null,
            'Address'
        ),
        _react2['default'].createElement(
            _reactFormable.Fieldset,
            { name: 'address' },
            _react2['default'].createElement(
                'label',
                null,
                'Building',
                _react2['default'].createElement(_reactFormable.Input, { name: 'building',
                    type: 'text',
                    validators: [required('building is required')] })
            ),
            _react2['default'].createElement(
                'label',
                null,
                'Street',
                _react2['default'].createElement(_reactFormable.Input, { name: 'street',
                    type: 'text',
                    validators: [required('street is required')] })
            ),
            _react2['default'].createElement(
                'label',
                null,
                'Zip',
                _react2['default'].createElement(_reactFormable.Input, { name: 'zip',
                    type: 'text',
                    validators: [required('zip is required')] })
            )
        ),
        _react2['default'].createElement('input', { type: 'submit', value: 'Submit' })
    );
}

FieldsetForm.propTypes = {
    onChange: _react.PropTypes.func
};

var source = "/*eslint func-style:0*/\nimport React, { PropTypes } from 'react';\nimport { Form, Input, Errors, Fieldset } from 'react-formable';\nconst { required } = require('react-formable').validators;\n\nexport default function FieldsetForm({ onChange }) {\n    return <Form onChange={onChange}>\n        <Errors className=\"formErrors\" />\n\n        <label>\n            Name\n            <Input name=\"name\"\n                   type=\"text\"\n                   validators={[\n                       required('name is required')\n                   ]} />\n        </label>\n\n        <h4>Address</h4>\n        <Fieldset name=\"address\">\n            <label>\n                Building\n                <Input name=\"building\"\n                       type=\"text\"\n                       validators={[\n                           required('building is required')\n                       ]} />\n            </label>\n            <label>\n                Street\n                <Input name=\"street\"\n                       type=\"text\"\n                       validators={[\n                           required('street is required')\n                       ]} />\n            </label>\n            <label>\n                Zip\n                <Input name=\"zip\"\n                       type=\"text\"\n                       validators={[\n                           required('zip is required')\n                       ]} />\n            </label>\n        </Fieldset>\n\n        <input type=\"submit\" value=\"Submit\" />\n    </Form>;\n}\n\nFieldsetForm.propTypes = {\n    onChange: PropTypes.func\n};\n\nexport const source = require('fs').readFileSync(__filename, 'utf8');\n";
exports.source = source;

},{"react":undefined,"react-formable":undefined}],32:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsFormExample = require('../../../../components/formExample');

var _componentsFormExample2 = _interopRequireDefault(_componentsFormExample);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

var code = function code() {
  return _react2['default'].createElement(_componentsFormExample2['default'], { example: _code2['default'], code: _code.source });
};
var markdown = "A simple example that includes a `<Fieldset />`.\n";

var content = [markdown, code];
exports.content = content;
var title = 'Fieldset';
exports.title = title;
var link = 'Fieldset';
exports.link = link;

},{"../../../../components/formExample":4,"./code":31,"react":undefined}],33:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = SignupForm;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormable = require('react-formable');

var _require$validators = require('react-formable').validators;

var required = _require$validators.required;
var equalsField = _require$validators.equalsField;

function SignupForm(_ref) {
    var onChange = _ref.onChange;

    return _react2['default'].createElement(
        _reactFormable.Form,
        { onChange: onChange },
        _react2['default'].createElement(_reactFormable.Errors, { className: 'formErrors' }),
        _react2['default'].createElement(
            'label',
            null,
            'User name *',
            _react2['default'].createElement(_reactFormable.Input, { name: 'username',
                type: 'text',
                validators: [required('username is required')] })
        ),
        _react2['default'].createElement(
            'label',
            null,
            'Password *',
            _react2['default'].createElement(_reactFormable.Input, { name: 'password',
                type: 'password',
                validators: [required('password is required')] })
        ),
        _react2['default'].createElement(
            'label',
            null,
            'Password Retype *',
            _react2['default'].createElement(_reactFormable.Input, { name: 'password2',
                type: 'password',
                validators: [equalsField('password', 'passwords must match')] })
        ),
        _react2['default'].createElement('input', { type: 'submit', value: 'Submit' })
    );
}

SignupForm.propTypes = {
    onChange: _react.PropTypes.func
};

var source = "/*eslint func-style:0*/\nimport React, { PropTypes } from 'react';\nimport { Form, Input, Errors } from 'react-formable';\nconst { required, equalsField } = require('react-formable').validators;\n\nexport default function SignupForm({ onChange }) {\n    return <Form onChange={onChange}>\n        <Errors className=\"formErrors\" />\n\n        <label>\n            User name *\n            <Input name=\"username\"\n                   type=\"text\"\n                   validators={[\n                       required('username is required')\n                   ]} />\n        </label>\n\n        <label>\n            Password *\n            <Input name=\"password\"\n                   type=\"password\"\n                   validators={[\n                       required('password is required')\n                   ]} />\n        </label>\n\n        <label>\n            Password Retype *\n            <Input name=\"password2\"\n                   type=\"password\"\n                   validators={[\n                       equalsField('password', 'passwords must match')\n                   ]} />\n        </label>\n\n        <input type=\"submit\" value=\"Submit\" />\n    </Form>;\n}\n\nSignupForm.propTypes = {\n    onChange: PropTypes.func\n};\n\nexport const source = require('fs').readFileSync(__filename, 'utf8');\n";
exports.source = source;

},{"react":undefined,"react-formable":undefined}],34:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsFormExample = require('../../../../components/formExample');

var _componentsFormExample2 = _interopRequireDefault(_componentsFormExample);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

var code = function code() {
  return _react2['default'].createElement(_componentsFormExample2['default'], { example: _code2['default'], code: _code.source });
};
var markdown = "Signup form with password matching validation? No problemo.\n";

var content = [markdown, code];
exports.content = content;
var title = 'Signup';
exports.title = title;
var link = 'Signup';
exports.link = link;

},{"../../../../components/formExample":4,"./code":33,"react":undefined}],35:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Footer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsGhLogo = require('../components/ghLogo');

var _componentsGhLogo2 = _interopRequireDefault(_componentsGhLogo);

var _componentsWtLogo = require('../components/wtLogo');

var _componentsWtLogo2 = _interopRequireDefault(_componentsWtLogo);

function Footer() {
    return _react2['default'].createElement(
        'div',
        { className: 'footer' },
        _react2['default'].createElement(
            'div',
            { className: 'logos' },
            _react2['default'].createElement(_componentsWtLogo2['default'], null),
            _react2['default'].createElement(_componentsGhLogo2['default'], null)
        ),
        _react2['default'].createElement(
            'p',
            null,
            'Built with love by the Web Apps Team at ',
            _react2['default'].createElement('br', null),
            ' WillowTree and by our awesome contributors.'
        )
    );
}

module.exports = exports['default'];

},{"../components/ghLogo":5,"../components/wtLogo":10,"react":undefined}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsPage = require('../../components/page');

var _componentsPage2 = _interopRequireDefault(_componentsPage);

//import * as Basic from './subsections/basic';
// import * as Advanced from './subsections/advanced';

var subsections = [
    //Basic,
    // Advanced
];

var description = '\nLooking to get started with react-formable? Awesome!\n\n## Installation\n\n**NPM**\n\n    npm install react-formable --save\n\n**Bower**\n\n    bower install react-formable --save\n\n## Quickstart\n\n    // ES6 Imports\n    import Form, { Input, Errors } from \'react-formable\';\n\n    // require\n    var Formable = require(\'react-formable\');\n    var Form = Formable.Form;\n    var Input = Formable.Input;\n    var Errors = Formable.Errors;\n\n    // require with de-structuring\n    var { Form, Input, Errors } = require(\'react-formable\');\n\nNow let\'s render a simple login form that will display errors.\n\n    const LoginForm = React.createClass({\n        onSubmit(form) {\n            console.log(form);\n        },\n\n        render() {\n            return <Form onSubmit={this.onSubmit}>\n                <Input name="username" type="text" />\n                <Input name="password" type="password" />\n                <button>Login</button>\n                <Errors />\n            </Form>;\n        }\n    });\n';

exports['default'] = _react2['default'].createClass({
    displayName: 'getting-started',

    propTypes: {
        children: _react.PropTypes.node,
        setSublinks: _react.PropTypes.func,
        setActiveSublink: _react.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { title: 'Getting Started',
            description: description,
            className: 'getting-started',
            subsections: subsections,
            setActiveSublink: this.props.setActiveSublink });
    }
});
module.exports = exports['default'];

},{"../../components/page":7,"react":undefined}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsPage = require('../../components/page');

var _componentsPage2 = _interopRequireDefault(_componentsPage);

var _subsectionsFormWalkThrough = require('./subsections/form-walk-through');

var FormWalkThrough = _interopRequireWildcard(_subsectionsFormWalkThrough);

var _subsectionsAddingValidation = require('./subsections/adding-validation');

var AddingValidation = _interopRequireWildcard(_subsectionsAddingValidation);

var _subsectionsDisplayingErrors = require('./subsections/displaying-errors');

var DisplayErrors = _interopRequireWildcard(_subsectionsDisplayingErrors);

var _subsectionsCreatingInputs = require('./subsections/creating-inputs');

var CreatignInputs = _interopRequireWildcard(_subsectionsCreatingInputs);

var _subsectionsReusableFormSections = require('./subsections/reusable-form-sections');

var ReusableFormSections = _interopRequireWildcard(_subsectionsReusableFormSections);

var _subsectionsHighorderForms = require('./subsections/highorder-forms');

var HighorderForms = _interopRequireWildcard(_subsectionsHighorderForms);

var _subsectionsFieldset = require('./subsections/fieldset');

var Fieldset = _interopRequireWildcard(_subsectionsFieldset);

var _subsectionsFieldlist = require('./subsections/fieldlist');

var Fieldlist = _interopRequireWildcard(_subsectionsFieldlist);

var subsections = [FormWalkThrough, Fieldset, Fieldlist, AddingValidation, DisplayErrors, CreatignInputs, ReusableFormSections, HighorderForms];

exports['default'] = _react2['default'].createClass({
    displayName: 'guides',

    propTypes: {
        children: _react.PropTypes.node,
        setSublinks: _react.PropTypes.func,
        setActiveSublink: _react.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { className: 'guides',
            subsections: subsections,
            setActiveSublink: this.props.setActiveSublink });
    }
});
module.exports = exports['default'];

},{"../../components/page":7,"./subsections/adding-validation":38,"./subsections/creating-inputs":39,"./subsections/displaying-errors":40,"./subsections/fieldlist":41,"./subsections/fieldset":42,"./subsections/form-walk-through":43,"./subsections/highorder-forms":44,"./subsections/reusable-form-sections":45,"react":undefined}],38:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var title = 'Adding Validation';
exports.title = title;
var link = 'adding-validation';
exports.link = link;
var content = ["In a perfect world, our beautiful `PersonForm` will always have proper information. Users will know exactly which fields are required and which ones are not. _Just in case_, we should probably do some validation to make sure things are all good.\n\nWith react-formable, you can validate any type of input, `Fieldset`, `Fieldlist`, and the `Form` itself. Each of these components takes in an array of validator functions. These validator functions are pure functions that take in params and return a string if errors are found. This string will then be inserted into our `fieldErrors` object and subsequently our `errors` array.\n\nEach validator takes the following three parameters:\n\n- `value`: The current value of the object. For inputs, it will be the value of the inputs. For `Form`s, `Fieldset`s, and `Fieldlist`s it will be an object or array of all the fields underneath it.\n- `fieldValues`: All the `fieldValues` for the form.\n- `fieldErrors?`: All the `fieldErrors` for the form. This will only be present if `addValidationErrors` is set to `true` on the parent `Form`.\n\n**NB:** `fieldValues` and `fieldErrors` in our validators params are the same values we receive in `onSubmit` and `onSuccess`.\n\nNow we can use this to make a `required` validator for `PersonForm`.\n\n```js\nfunction required(value, fieldValues, fieldErrors) {\n\tif (!value || !value.length) {\n\t\treturn 'Missing required field!';\n\t}\n};\n```\n\nNow, let's use it! _(To keep things manageable, we will go back to a simpler person form)_.\n\n```js\nfunction PersonForm(props) {\n\treturn <Form onSubmit={onSubmit}>\n\t\t<label>\n\t\t\tName:\n\t\t\t<Input name=\"name\"\n\t\t\t\t   type=\"text\"\n\t\t\t\t   validators={[\n\t\t\t\t\t   required\n\t\t\t\t   ]}/>\n\t\t</label>\n\t\t<label>\n\t\t\tAge:\n\t\t\t<Input name=\"age\"\n\t\t\t\t   type=\"text\"\n\t\t\t\t   validators={[\n\t\t\t\t\t   required\n\t\t\t\t   ]}/>\n\t\t</label>\n\t</Form>;\n}\n```\n\nNotice here we are passing in our newly created `required` function to the array supplied to the `validators` prop. In this manner, you can chain as many validators as you want together. What does this result in?\n\n```json\n{\n\t\"valid\": false,\n\t\"fieldValues\": {\n\t\t\"name\": \"\",\n\t\t\"age\": \"\"\n\t},\n\t\"fieldErrors\": {\n\t\t\"name\": [\"Missing required field!\"],\n\t\t\"age\": [\"Missing required field!\"]\n\t},\n\t\"errors\": [\"Missing required field!\"]\n}\n```\n\nWe see here that in `fieldErrors` both `name` and `age` have the the error message. `errors` only has one copy of the two messages. This is due to `errors` always compacting the strings to unique values.\n\nMoving forward, how can we write our `required` validator to display custom error messages? We can do this by making it a higher order (or curried) function.\n\n```js\nfunction required(errorMessage) {\n\treturn function (value, fieldValues, fieldErrors)\n\t\tif (!value || !value.length) {\n\t\t\treturn 'Missing required field!';\n\t\t}\n\t};\n};\n```\n\nNow we have a function that takes in an error message and returns a validator which will display the error message if our field is not present. In use, our form looks very similar.\n\n```js\nfunction PersonForm(props) {\n\treturn <Form onSubmit={onSubmit}>\n\t\t<label>\n\t\t\tName:\n\t\t\t<Input name=\"name\"\n\t\t\t\t   type=\"text\"\n\t\t\t\t   validators={[\n\t\t\t\t\t   required('Please supply a name.')\n\t\t\t\t   ]}/>\n\t\t</label>\n\t\t<label>\n\t\t\tAge:\n\t\t\t<Input name=\"age\"\n\t\t\t\t   type=\"text\"\n\t\t\t\t   validators={[\n\t\t\t\t\t   required('Please supply an age')\n\t\t\t\t   ]}/>\n\t\t</label>\n\t</Form>;\n}\n```\n\nValidating `Fieldset`s, `Fieldlist`s, and `Form`s are all similar. The only difference is the `value` property supplied to the validator is the value of all its subfields. With `Fieldlist`, it is an array of objects, `Fieldset` and `Form` receive an object.\n"];
exports.content = content;

},{}],39:[function(require,module,exports){
/*eslint prefer-template:0*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var title = 'Creating Inputs';
exports.title = title;
var link = 'creating-inputs';

exports.link = link;
var content = ["react-formable only ships with one lightweight `Input` component. Chances are you will want to create your own fields and it really can't be any simpler. To integrate a custom field with the `Form`, you need to do the following things:\n\n- Have a `getValue` method which returns the value of the field\n- Trigger the `onChange` event when the field changes\n- Trigger the `onSubmit` event when the field wants to submit the form (optional)\n- Not be a stateless component\n\nTo illustrate this we will create our own custom field that displays errors inline next to the field. To start off, let's examine what props the `Form` component provides to fields:\n\n- `fieldErrors`: An array of strings representing errors\n- `onChange` and `onSubmit` callbacks\n\nSimple right? Now to build the field! We will be building a field from scratch, however if you wanted to just wrap the existing `Input` component, that would work too.\n\n```js\nimport React from 'react';\n\nconst ErrorField = React.createClass({\n\tgetValue() {\n\t\treturn this.refs.input.value;\n\t},\n\n    render() {\n\t\tlet errors;\n        let { fieldErrors = [], className = '' } = this.props;\n\n\t\tif (fieldErrors.length) {\n\t\t\tclassName += 'error';\n\n\t\t\terrors = <ul className=\"errors\">\n\t\t\t\t{fieldErrors.map((error) => <li key={error}>{error}</li>)}\n\t\t\t</ul>;\n\t\t}\n\n\t\treturn <label className={className}>\n\t\t\t<input {...this.props} ref=\"input\" />\n\t\t\t{errors}\n\t\t</label>;\n    }\n});\n```\n\nThere is a bit going on here, so let's break it down.\n\nThe most important piece is our `getValue` method. This is the only necessary method your field needs to implement in order to work with react-formable. The implementation here is simple, just reach into `refs` and get the value of the input.\n\nThe `render` method also has some interesting interesting things to note. The most obvious is optionally rendering a list of errors and modifying the `className` of the `label`. As we mentioned before, every component receives `fieldErrors` as a prop. We can then use this as a means to render our errors.\n\nThe second thing to point out is the use of splatting our props to our input. The most important thing this accomplishes is binding our `onChange` and `onSubmit` callbacks to our input. Recall our 3 requirements? Implement `getValue` and bind `onChange` and `onSubmit`. Our `Form` passes down the callbacks to our component which then forwards those callbacks to the input. HTML inputs automatically triggers these callbacks when the user interacts with them. If we wrote a custom input that did not use native HTML inputs, we would need to trigger these callbacks manually.\n"];
exports.content = content;

},{}],40:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var title = 'Displaying Errors';
exports.title = title;
var link = 'display-errors';
exports.link = link;
var content = ["We now know how to validate fields but how do we show these error messages to the screen? With react-formable, there are numerous ways we can display errors.\n\n### Inline errors\n\nIt is pretty standard to draw attention to fields when they have errors. This could mean outlining the field in red, putting an asterisks next to it, or perhaps even a tooltip. To accomplish this, the `Form` component passes down an array of strings called `fieldErrors` to each named input (or an object / array for `Fieldset` / `Fieldlist`). It is then up to the component to decide what to do with these errors.\n\nThe `Input` component bundled with react-formable appends a className of `\"error\"` to the component when errors are present. This can be used to style the input accordingly. If you want to display errors next to fields making a new input is as simple as can be. We will detail that later in this guide.\n\nForms by default show field level errors whenever the form is submitted. This can be toggled on and off via the `showErrorsOnSubmit` which defaults to `true`. There is also a prop `showErrorsOnChange` to control if field errors should be passed down `onChange`.\n\n### Lists of errors\n\nMore common perhaps is to show a unified list of errors near the submit button of the form. If we wanted to do this by hand, we would have to have some state on our component which keeps track of the errors output by the form. When we submit the form, we set the state and re-render the view with the errors. In practice, this happens in nearly every form you will make. To DRY up our code, there is an `<Errors />` component that does this for us.\n\n```js\nimport Form, { Input, Errors } from 'react-formable';\n\nfunction PersonForm(props) {\n\treturn <Form onSubmit={onSubmit}>\n\t\t<label>\n\t\t\tName:\n\t\t\t<Input name=\"name\"\n\t\t\t\t   type=\"text\"\n\t\t\t\t   validators={[\n\t\t\t\t\t   required('Please supply a name.')\n\t\t\t\t   ]}/>\n\t\t</label>\n\t\t<label>\n\t\t\tAge:\n\t\t\t<Input name=\"age\"\n\t\t\t\t   type=\"text\"\n\t\t\t\t   validators={[\n\t\t\t\t\t   required('Please supply an age')\n\t\t\t\t   ]}/>\n\t\t</label>\n\t\t<Errors />\n\t\t<button>Submit</button>\n\t</Form>;\n}\n```\n\nWe can think of `<Errors />` as a placeholder. The component will render a list of errors wherever we place it. We can control how they render via its `renderError` prop. This prop takes in a function with a parameter of a string. Whatever we return from this function will be rendered in our list.\n\nWhat about server errors? We can pass down `additionalErrors` to the component to render arbitrary errors. For example:\n\n\n```js\nimport Form, { Input, Errors } from 'react-formable';\n\nconst ErrorForm = React.createClass({\n\tgetInitialState() {\n\t\treturn { errors: [] };\n\t},\n\n\tonSubmit(form) {\n\t\tif (!form.valid) return;\n\t\tajax.get('/api/users', form.fieldValues)\n\t\t\t.then((data) => /* process the data */)\n\t\t\t.catch((errors) => this.setState({ errors }));\n\t},\n\n\trender() {\n\t\treturn <Form onSubmit={this.onSubmit}>\n\t\t\t<Input name=\"username\"\n\t\t\t\t   type=\"text\"\n\t\t\t\t   validators={[\n\t\t\t\t\t   required('Please supply a username.')\n\t\t\t\t   ]}/>\n\t\t\t<Errors additionalErrors={this.state.errors} />\n\t\t\t<button>Submit</button>\n\t\t</Form>;\n\t}\n});\n```\n"];
exports.content = content;

},{}],41:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var title = 'Grouping Inputs: Fieldlist';
exports.title = title;
var link = 'grouping-inputs-fieldlist';
exports.link = link;
var content = ["What? _Another_ requirement change? As it turns out, people typically have more than one pet. How can we have lists of pets within our form? Simply, we can use the `Fieldlist` component to group together lists of values.\n\n```js\nimport Form, { Input, Fieldlist } from 'react-formable';\n\nfunction onSubmit(form) {\n\tconsole.log(form);\n}\n\nfunction PersonForm(props) {\n\treturn <Form onSubmit={onSubmit}>\n\t\t<label> Name: <Input name=\"name\" type=\"text\" /> </label>\n\t\t<label> Age: <Input name=\"age\" type=\"text\" /> </label>\n\t\t<Fieldlist name=\"pets\">\n\t\t\t<div>\n\t\t\t\t<label> Pet Name: <Input name=\"name\" type=\"text\" /> </label>\n\t\t\t\t<label> Pet Type: <Input name=\"type\" type=\"text\" /> </label>\n\t\t\t</div>\n\t\t\t{/* more pets here... */}\n\t\t</Fieldlist>\n\t\t<button>Submit</button>\n\t</Form>;\n}\n```\n\nSimilar to `Fieldset`, `Fieldlist` accepts a `name` property which it nests all its children under. Internally, `Fieldlist` works by taking each direct child it owns and wrapping it in a `Fieldset`. This is why we don't need to use `Fieldset` within `Fieldlists`. If we did, we would have an extra object with the name of the `Fieldset` within our form data.\n\nAs we would expect, our `Fieldlist` has a value of an array of objects which we see in its returned value.\n\n```json\n{\n\t\"valid\": true,\n\t\"fieldValues\": {\n\t\t\"name\": \"\",\n\t\t\"age\": \"\",\n\t\t\"pets\": [\n\t\t\t{\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"\"\n\t\t\t}\n\t\t]\n\t},\n\t\"fieldErrors\": {\n\t\t\"name\": [],\n\t\t\"age\": [],\n\t\t\"pets\": [\n\t\t\t{\n\t\t\t\t\"name\": [],\n\t\t\t\t\"type\": []\n\t\t\t}\n\t\t]\n\t},\n\t\"errors\": []\n}\n```\n\nWith this in mind, we could easily make a `Fieldlist` with only inputs in it. For example, a form with just names of people.\n\n```js\nimport Form, { Input, Fieldlist } from 'react-formable';\n\nfunction PeopleNameForm(props) {\n\treturn <Form>\n\t\t<Fieldlist name=\"people\">\n\t\t\t<label> Name: <Input name=\"name\" type=\"text\" /> </label>\n\t\t\t<label> Name: <Input name=\"name\" type=\"text\" /> </label>\n\t\t\t<label> Name: <Input name=\"name\" type=\"text\" /> </label>\n\t\t</Fieldlist>\n\t\t<button>Submit</button>\n\t</Form>;\n}\n```\n"];
exports.content = content;

},{}],42:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var title = 'Grouping Inputs: Fieldset';
exports.title = title;
var link = 'grouping-inputs-fieldset';
exports.link = link;
var content = ["Suddenly, our requirements change! Now we want to know more information about our person's pet. We want to know its `name` and `type`. Our server expects a `Pet` model to be an object with `name` and `type` as fields, how can we accommodate this?\n\nreact-formable comes with a `Fieldset` component which does exactly this. `Fieldset` takes in a `name` property and groups inputs within its scope.\n\n```js\nimport Form, { Input, Fieldset } from 'react-formable';\n\nfunction onSubmit(form) {\n\tconsole.log(form);\n}\n\nfunction PersonForm(props) {\n\treturn <Form onSubmit={onSubmit}>\n\t\t<label> Name: <Input name=\"name\" type=\"text\" /> </label>\n\t\t<label> Age: <Input name=\"age\" type=\"text\" /> </label>\n\t\t<Fieldset name=\"pet\">\n\t\t\t<label> Pet Name: <Input name=\"name\" type=\"text\" /> </label>\n\t\t\t<label> Pet Type: <Input name=\"type\" type=\"text\" /> </label>\n\t\t</Fieldset>\n\t\t<button>Submit</button>\n\t</Form>;\n}\n```\n\nNot too much has changed. We wrapped our two pet fields within a `Fieldset` named `pet`. One interesting thing to note is we now have two inputs in our form with a name of `name`. Normally, `Form` would warn you that your inputs must have unique names. `Fieldset`s (and `Fieldlist`s) get around this limitation by scoping fields. To better understand this, here is the result of serializing the form.\n\n```json\n{\n\t\"valid\": true,\n\t\"fieldValues\": {\n\t\t\"name\": \"\",\n\t\t\"age\": \"\",\n\t\t\"pet\": {\n\t\t\t\"name\": \"\",\n\t\t\t\"type\": \"\"\n\t\t}\n\t},\n\t\"fieldErrors\": {\n\t\t\"name\": [],\n\t\t\"age\": [],\n\t\t\"pet\": {\n\t\t\t\"name\": [],\n\t\t\t\"type\": []\n\t\t}\n\t},\n\t\"errors\": []\n}\n```\n\nAs we can see, our `fieldValues` and `fieldList` properties have a new `pet` object that has child properties of `name` and `type`. Similarly, our `fieldErrors` property has nested arrays that match up with our `fieldValues`.\n"];
exports.content = content;

},{}],43:[function(require,module,exports){
/*eslint prefer-template:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var title = 'Form Walk Through';
exports.title = title;
var link = 'form-walk-through';
exports.link = link;
var content = ["react-formable gives you a handful of components that allow you to compose abstract forms to your hearts content. To demonstrate this, we will build a \"person\" form. We want the ability to add people with a name, age, and a pet. To start, we will only need two components, `Form` and `Input`.\n\nThis simple example brings to light a few design decisions of react-formable.\n\n- There is no need for rigid markup or schemas. You can structure your markup however you want.\n- To make an input visible to the `Form` component, you must supply a `name` property which is unique.\n\nWith this in mind, what is actually happening here? We have created a [stateless component](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) which renders a `Form` to the screen. Our component logs out the value of the form whenever it is submitted either via the html buttons default click functionality or pressing enter within an input. All in all, not too exciting. Let's take a peak at the data that gets logged to the console.\n\n```js\nimport React from 'react';\nimport Form, { Input } from 'react-formable';\n\nexport default function PersonForm({ onChange }) {\n    return <Form onChange={onChange}>\n        <label> Name: <Input name=\"name\" type=\"text\" /> </label>\n        <label> Age: <Input name=\"age\" type=\"text\" /> </label>\n        <label> Pet: <Input name=\"pet\" type=\"text\" /> </label>\n        <button>Submit</button>\n    </Form>;\n}\n```\n\n### Form return value\n\nNow this is more exciting to look at. At the core of this data structure is `fieldValues` and `fieldErrors`. These two objects mirror the structure of your form. `fieldValues`, as the name implies, is a key value object where the key is the name of your input and the value is its value.  `fieldErrors` is similar, however the values in this object are arrays of string representing errors.\n\nThe remaining fields, `valid` and `errors`, are computed properties. `errors` is a flattened down and compacted array of all the errors found in `fieldErrors`. This means if multiple fields have errors of the message `\"required\"` then the `errors` array will only contain a single string, `\"required\"`. We can use this array for easily keeping track of errors as our forms grow in complexity. `valid` is a simple boolean which tells us if our form is valid. It does this by checking the length of the `errors` property.\n\n```json\n{\n\t\"valid\": true,\n\t\"fieldValues\": {\n\t\t\"name\": \"\",\n\t\t\"age\": \"\",\n\t\t\"pet\": \"\"\n\t},\n\t\"fieldErrors\": {\n\t\t\"name\": [],\n\t\t\"age\": [],\n\t\t\"pet\": []\n\t},\n\t\"errors\": []\n}\n```\n"];
exports.content = content;

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var title = 'Highorder Forms';
exports.title = title;
var link = 'highorder-forms';

exports.link = link;
var markdown = '\n';
exports.markdown = markdown;

},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var title = 'Reusable Form Sections';
exports.title = title;
var link = 'reusable-form-sections';

exports.link = link;
var markdown = '\n';
exports.markdown = markdown;

},{}],46:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Header;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _componentsGhLogo = require('../components/ghLogo');

var _componentsGhLogo2 = _interopRequireDefault(_componentsGhLogo);

function Header(_ref) {
    var links = _ref.links;

    var navLinks = links.map(function (_ref2) {
        var link = _ref2.link;
        var title = _ref2.title;
        return _react2['default'].createElement(
            'li',
            { key: link },
            _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/' + link, activeClassName: 'active' },
                title
            )
        );
    });

    return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'header',
                { className: 'header' },
                _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/home' },
                    _react2['default'].createElement('img', { className: 'logo', src: './imgs/logo@2x.png' })
                ),
                _react2['default'].createElement(
                    'nav',
                    null,
                    _react2['default'].createElement(
                        'ul',
                        null,
                        _react2['default'].createElement(
                            'li',
                            null,
                            _react2['default'].createElement(_componentsGhLogo2['default'], null)
                        )
                    )
                )
            )
        ),
        _react2['default'].createElement(
            'div',
            { className: 'mobile-nav' },
            _react2['default'].createElement(
                'ul',
                null,
                navLinks
            )
        )
    );
}

module.exports = exports['default'];

},{"../components/ghLogo":5,"react":undefined,"react-router":undefined}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsWell = require('../../components/well');

var _componentsWell2 = _interopRequireDefault(_componentsWell);

var _reactRouter = require('react-router');

/*eslint react/jsx-max-props-per-line:0*/
exports['default'] = _react2['default'].createClass({
    displayName: 'home',

    propTypes: {
        children: _react.PropTypes.node
    },

    componentWillMount: function componentWillMount() {
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(
            'div',
            { className: 'home' },
            _react2['default'].createElement(
                'h2',
                null,
                'What is react-formable?'
            ),
            _react2['default'].createElement(
                'p',
                null,
                'React-Formable is a form library that gets out of your way. It makes no assumptions on schemas, inputs, structure, or favorite foods.'
            ),
            _react2['default'].createElement(
                'p',
                null,
                'Inspired by functional libraries such as ',
                _react2['default'].createElement(
                    'a',
                    { href: 'http://ramdajs.com/', target: '_blank' },
                    'ramdajs'
                ),
                ', react-formable favors predictable discrete components which you compose together to build complex forms. Nested forms? List forms? Conditional forms that behave certain ways on the full moon? No problem, react-formable has your back.'
            ),
            _react2['default'].createElement(
                'p',
                null,
                'Check out the ',
                _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/getting-started' },
                    'getting started'
                ),
                ' page for installation help. Looking for proof why it\'s so cool? Head on over to our ',
                _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/examples' },
                    'examples'
                ),
                ' to see what\'s up!'
            ),
            _react2['default'].createElement(
                _componentsWell2['default'],
                { className: 'github-well' },
                _react2['default'].createElement(
                    'h3',
                    null,
                    'Like it? Love it? Want to marry it?'
                ),
                _react2['default'].createElement(
                    'p',
                    null,
                    'Contribute to our repo on GitHub.'
                ),
                _react2['default'].createElement(
                    'a',
                    { className: 'btn', href: 'https://github.com/willowtreeapps/react-formable', target: '_blank' },
                    'GitHub'
                )
            )
        );
    }
});
module.exports = exports['default'];

},{"../../components/well":9,"react":undefined,"react-router":undefined}],48:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Sidebar;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function renderSublinks(subLinks, activeSublink) {
    var _this = this;

    return _react2['default'].createElement(
        'ul',
        null,
        subLinks.map(function (_ref) {
            var title = _ref.title;
            var link = _ref.link;
            var subsections = _ref.subsections;

            var formattedTitle = activeSublink === link ? _react2['default'].createElement(
                'strong',
                null,
                title
            ) : title;

            return _react2['default'].createElement(
                'li',
                { key: link },
                _react2['default'].createElement(
                    'span',
                    { className: 'a', onClick: scrollToId.bind(_this, link) },
                    formattedTitle
                ),
                subsections && renderSublinks(subsections, activeSublink)
            );
        })
    );
}

function Sidebar(_ref2) {
    var links = _ref2.links;
    var _ref2$subLinks = _ref2.subLinks;
    var subLinks = _ref2$subLinks === undefined ? [] : _ref2$subLinks;
    var style = _ref2.style;
    var activePath = _ref2.activePath;
    var activeSublink = _ref2.activeSublink;

    activePath = activePath.split('/').pop();

    var navLinks = links.map(function (_ref3) {
        var link = _ref3.link;
        var title = _ref3.title;
        return _react2['default'].createElement(
            'li',
            { key: link },
            _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/' + link, activeClassName: 'active' },
                title
            ),
            activePath === link && renderSublinks(subLinks, activeSublink)
        );
    });

    return _react2['default'].createElement(
        'nav',
        { className: 'sidebar', style: style },
        _react2['default'].createElement(
            'ul',
            null,
            navLinks
        )
    );
}

Sidebar.propTypes = {
    links: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        title: _react.PropTypes.string,
        link: _react.PropTypes.string
    })).isRequired,
    subLinks: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        title: _react.PropTypes.string,
        link: _react.PropTypes.string
    })).isRequired,
    style: _react.PropTypes.object,
    activeSublink: _react.PropTypes.string
};
module.exports = exports['default'];

},{"react":undefined,"react-router":undefined}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _controllersBase = require('./controllers/base');

var _controllersBase2 = _interopRequireDefault(_controllersBase);

var _controllersHomeHome = require('./controllers/home/home');

var _controllersHomeHome2 = _interopRequireDefault(_controllersHomeHome);

var _controllersExamplesExamples = require('./controllers/examples/examples');

var _controllersExamplesExamples2 = _interopRequireDefault(_controllersExamplesExamples);

var _controllersApiApi = require('./controllers/api/api');

var _controllersApiApi2 = _interopRequireDefault(_controllersApiApi);

var _controllersGettingStartedGettingStarted = require('./controllers/getting-started/getting-started');

var _controllersGettingStartedGettingStarted2 = _interopRequireDefault(_controllersGettingStartedGettingStarted);

var _controllersGuidesGuides = require('./controllers/guides/guides');

var _controllersGuidesGuides2 = _interopRequireDefault(_controllersGuidesGuides);

exports['default'] = _react2['default'].createElement(
	_reactRouter.Route,
	{ path: '/', component: _controllersBase2['default'] },
	_react2['default'].createElement(_reactRouter.IndexRoute, { component: _controllersHomeHome2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'home', component: _controllersHomeHome2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'examples', component: _controllersExamplesExamples2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'api', component: _controllersApiApi2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'guides', component: _controllersGuidesGuides2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'getting-started', component: _controllersGettingStartedGettingStarted2['default'] })
);
module.exports = exports['default'];

},{"./controllers/api/api":11,"./controllers/base":25,"./controllers/examples/examples":26,"./controllers/getting-started/getting-started":36,"./controllers/guides/guides":37,"./controllers/home/home":47,"react":undefined,"react-router":undefined}],50:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":51,"./lib/keys.js":52}],51:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],52:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],53:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],54:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],55:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))
},{"_process":68,"warning":70}],56:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  // FIXME: Work around our browser history not working correctly on Chrome
  // iOS: https://github.com/rackt/react-router/issues/2565
  if (ua.indexOf('CriOS') !== -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],57:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],58:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./DOMUtils":56,"./ExecutionEnvironment":57,"./createHistory":60,"_process":68,"invariant":66}],59:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function isAbsolutePath(path) {
  return typeof path === 'string' && path.charAt(0) === '/';
}

function ensureSlash() {
  var path = _DOMUtils.getHashPath();

  if (isAbsolutePath(path)) return true;

  _DOMUtils.replaceHashPath('/' + path);

  return false;
}

function addQueryStringValueToPath(path, key, value) {
  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
}

function stripQueryStringValueFromPath(path, key) {
  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
}

function getQueryStringValueFromPath(path, key) {
  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
  return match && match[1];
}

var DefaultQueryKey = '_k';

function createHashHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

  var queryKey = options.queryKey;

  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

  function getCurrentLocation() {
    var path = _DOMUtils.getHashPath();

    var key = undefined,
        state = undefined;
    if (queryKey) {
      key = getQueryStringValueFromPath(path, queryKey);
      path = stripQueryStringValueFromPath(path, queryKey);

      if (key) {
        state = _DOMStateStorage.readState(key);
      } else {
        state = null;
        key = history.createKey();
        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
      }
    } else {
      key = state = null;
    }

    var location = _parsePath2['default'](path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startHashChangeListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function hashChangeListener() {
      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

      transitionTo(getCurrentLocation());
    }

    ensureSlash();
    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    var path = (basename || '') + pathname + search;

    if (queryKey) {
      path = addQueryStringValueToPath(path, queryKey, key);
      _DOMStateStorage.saveState(key, state);
    } else {
      // Drop key and state.
      location.key = location.state = null;
    }

    var currentHash = _DOMUtils.getHashPath();

    if (action === _Actions.PUSH) {
      if (currentHash !== path) {
        window.location.hash = path;
      } else {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
      }
    } else if (currentHash !== path) {
      // REPLACE
      _DOMUtils.replaceHashPath(path);
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopHashChangeListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopHashChangeListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopHashChangeListener();
    };
  }

  function push(location) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.push(location);
  }

  function replace(location) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.replace(location);
  }

  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

  function go(n) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

    history.go(n);
  }

  function createHref(path) {
    return '#' + history.createHref(path);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopHashChangeListener();
  }

  // deprecated
  function pushState(state, path) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.pushState(state, path);
  }

  // deprecated
  function replaceState(state, path) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.replaceState(state, path);
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    push: push,
    replace: replace,
    go: go,
    createHref: createHref,

    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
    pushState: pushState, // deprecated - warning is in createHistory
    replaceState: replaceState // deprecated - warning is in createHistory
  });
}

exports['default'] = createHashHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./Actions":53,"./DOMStateStorage":55,"./DOMUtils":56,"./ExecutionEnvironment":57,"./createDOMHistory":58,"./parsePath":64,"_process":68,"invariant":66,"warning":70}],60:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      //warning(
      //  false,
      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
      //  'location descriptor instead'
      //)

      if (typeof location === 'string') location = _parsePath2['default'](location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":53,"./AsyncUtils":54,"./createLocation":61,"./deprecate":62,"./parsePath":64,"./runTransitionHook":65,"deep-equal":50}],61:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _parsePath2['default'](location);

  if (typeof action === 'object') {
    //warning(
    //  false,
    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
    //  'location descriptor instead'
    //)

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":53,"./parsePath":64}],62:[function(require,module,exports){
//import warning from 'warning'

"use strict";

exports.__esModule = true;
function deprecate(fn) {
  return fn;
  //return function () {
  //  warning(false, '[history] ' + message)
  //  return fn.apply(this, arguments)
  //}
}

exports["default"] = deprecate;
module.exports = exports["default"];
},{}],63:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],64:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./extractPath":63,"_process":68,"warning":70}],65:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":68,"warning":70}],66:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],67:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],68:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],69:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITIONS = {
  above: 'above',
  inside: 'inside',
  below: 'below'
};

var propTypes = {
  // threshold is percentage of the height of the visible part of the
  // scrollable ancestor (e.g. 0.1)
  threshold: _react.PropTypes.number,
  onEnter: _react.PropTypes.func,
  onLeave: _react.PropTypes.func
};

var defaultProps = {
  threshold: 0,
  onEnter: function onEnter() {},
  onLeave: function onLeave() {}
};

/**
 * Calls a function when you scroll to the element.
 */

var Waypoint = (function (_React$Component) {
  _inherits(Waypoint, _React$Component);

  function Waypoint() {
    _classCallCheck(this, Waypoint);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Waypoint).apply(this, arguments));
  }

  _createClass(Waypoint, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._handleScroll = this._handleScroll.bind(this);

      this.scrollableAncestor = this._findScrollableAncestor();
      this.scrollableAncestor.addEventListener('scroll', this._handleScroll);
      window.addEventListener('resize', this._handleScroll);
      this._handleScroll(null);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // The element may have moved.
      this._handleScroll(null);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.scrollableAncestor) {
        // At the time of unmounting, the scrollable ancestor might no longer
        // exist. Guarding against this prevents the following error:
        //
        //   Cannot read property 'removeEventListener' of undefined
        this.scrollableAncestor.removeEventListener('scroll', this._handleScroll);
      }
      window.removeEventListener('resize', this._handleScroll);
    }

    /**
     * Traverses up the DOM to find an ancestor container which has an overflow
     * style that allows for scrolling.
     *
     * @return {Object} the closest ancestor element with an overflow style that
     *   allows for scrolling. If none is found, the `window` object is returned
     *   as a fallback.
     */

  }, {
    key: '_findScrollableAncestor',
    value: function _findScrollableAncestor() {
      var node = _reactDom2.default.findDOMNode(this);

      while (node.parentNode) {
        node = node.parentNode;

        if (node === document) {
          // This particular node does not have a computed style.
          continue;
        }

        if (node === document.documentElement) {
          // This particular node does not have a scroll bar, it uses the window.
          continue;
        }

        var style = window.getComputedStyle(node);
        var overflowY = style.getPropertyValue('overflow-y') || style.getPropertyValue('overflow');

        if (overflowY === 'auto' || overflowY === 'scroll') {
          return node;
        }
      }

      // A scrollable ancestor element was not found, which means that we need to
      // do stuff on window.
      return window;
    }

    /**
     * @param {Object} event the native scroll event coming from the scrollable
     *   ancestor, or resize event coming from the window. Will be undefined if
     *   called by a React lifecyle method
     */

  }, {
    key: '_handleScroll',
    value: function _handleScroll(event) {
      var currentPosition = this._currentPosition();
      var previousPosition = this._previousPosition || null;

      // Save previous position as early as possible to prevent cycles
      this._previousPosition = currentPosition;

      if (previousPosition === currentPosition) {
        // No change since last trigger
        return;
      }

      if (currentPosition === POSITIONS.inside) {
        this.props.onEnter.call(this, event, previousPosition);
      } else if (previousPosition === POSITIONS.inside) {
        this.props.onLeave.call(this, event, currentPosition);
      }

      var isRapidScrollDown = previousPosition === POSITIONS.below && currentPosition === POSITIONS.above;
      var isRapidScrollUp = previousPosition === POSITIONS.above && currentPosition === POSITIONS.below;
      if (isRapidScrollDown || isRapidScrollUp) {
        // If the scroll event isn't fired often enough to occur while the
        // waypoint was visible, we trigger both callbacks anyway.
        this.props.onEnter.call(this, event, previousPosition);
        this.props.onLeave.call(this, event, currentPosition);
      }
    }

    /**
     * @param {Object} node
     * @return {Number}
     */

  }, {
    key: '_distanceToTopOfScrollableAncestor',
    value: function _distanceToTopOfScrollableAncestor(node) {
      if (this.scrollableAncestor !== window && !node.offsetParent) {
        throw new Error('The scrollable ancestor of Waypoint needs to have positioning to ' + 'properly determine position of Waypoint (e.g. `position: relative;`)');
      }

      if (this.scrollableAncestor === window) {
        var rect = node.getBoundingClientRect();
        return rect.top + window.pageYOffset - document.documentElement.clientTop;
      }

      if (node.offsetParent === this.scrollableAncestor || !node.offsetParent) {
        return node.offsetTop;
      } else {
        return node.offsetTop + this._distanceToTopOfScrollableAncestor(node.offsetParent);
      }
    }

    /**
     * @return {boolean} true if scrolled down almost to the end of the scrollable
     *   ancestor element.
     */

  }, {
    key: '_currentPosition',
    value: function _currentPosition() {
      var waypointTop = this._distanceToTopOfScrollableAncestor(_reactDom2.default.findDOMNode(this));
      var contextHeight = undefined;
      var contextScrollTop = undefined;

      if (this.scrollableAncestor === window) {
        contextHeight = window.innerHeight;
        contextScrollTop = window.pageYOffset;
      } else {
        contextHeight = this.scrollableAncestor.offsetHeight;
        contextScrollTop = this.scrollableAncestor.scrollTop;
      }

      var thresholdPx = contextHeight * this.props.threshold;

      var isBelowTop = contextScrollTop <= waypointTop + thresholdPx;
      if (!isBelowTop) {
        return POSITIONS.above;
      }

      var contextBottom = contextScrollTop + contextHeight;
      var isAboveBottom = contextBottom >= waypointTop - thresholdPx;
      if (!isAboveBottom) {
        return POSITIONS.below;
      }

      return POSITIONS.inside;
    }

    /**
     * @return {Object}
     */

  }, {
    key: 'render',
    value: function render() {
      // We need an element that we can locate in the DOM to determine where it is
      // rendered relative to the top of its context.
      return _react2.default.createElement('span', { style: { fontSize: 0 } });
    }
  }]);

  return Waypoint;
})(_react2.default.Component);

exports.default = Waypoint;

Waypoint.propTypes = propTypes;
Waypoint.above = POSITIONS.above;
Waypoint.below = POSITIONS.below;
Waypoint.defaultProps = defaultProps;

},{"react":undefined,"react-dom":undefined}],70:[function(require,module,exports){
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

},{}]},{},[1]);
