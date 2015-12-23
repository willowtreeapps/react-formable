require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _history = require('history');

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var history = (0, _history.useBasename)(_history.createHistory)({
    basename: window.location.pathname.indexOf('react') !== -1 ? '/react-formable' : '/'
});

(0, _reactDom.render)(_react2['default'].createElement(
    _reactRouter.Router,
    { history: history },
    _routes2['default']
), document.getElementById('app'));

},{"./routes":21,"history":undefined,"react":undefined,"react-dom":undefined,"react-router":undefined}],2:[function(require,module,exports){
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

},{"react":undefined}],3:[function(require,module,exports){
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

},{"marked":22,"react":undefined}],4:[function(require,module,exports){
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
    var title = _props$title === undefined ? 'Title' : _props$title;
    var _props$className = props.className;
    var className = _props$className === undefined ? '' : _props$className;
    var description = props.description;
    var _props$subsections = props.subsections;
    var subsections = _props$subsections === undefined ? [] : _props$subsections;

    return _react2['default'].createElement(
        'div',
        { className: className + ' page' },
        _react2['default'].createElement(
            'h1',
            null,
            title
        ),
        description && _react2['default'].createElement(_md2['default'], { text: description }),
        subsections.map(function (subsection, i) {
            return _react2['default'].createElement(_subsection2['default'], _extends({ key: i }, subsection));
        })
    );
}

Page.propTypes = {
    className: _react.PropTypes.string,
    title: _react.PropTypes.string,
    description: _react.PropTypes.string,
    subsections: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        title: _react.PropTypes.string,
        markdown: _react.PropTypes.string,
        code: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func])
    }))
};
module.exports = exports['default'];

},{"./md":3,"./subsection":5,"react":undefined}],5:[function(require,module,exports){
/*eslint func-style:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Subsection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md = require('./md');

var _md2 = _interopRequireDefault(_md);

function Subsection(props) {
    var _props$title = props.title;
    var title = _props$title === undefined ? 'Subsection' : _props$title;
    var markdown = props.markdown;
    var link = props.link;
    var Code = props.code;

    return _react2['default'].createElement(
        'div',
        { id: link, className: 'subsection' },
        _react2['default'].createElement(
            'h3',
            null,
            title
        ),
        markdown && _react2['default'].createElement(_md2['default'], { text: markdown }),
        Code && _react2['default'].createElement(Code, null)
    );
}

Subsection.propTypes = {
    title: _react.PropTypes.string,
    id: _react.PropTypes.string,
    link: _react.PropTypes.string,
    markdown: _react.PropTypes.string,
    code: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func])
};
module.exports = exports['default'];

},{"./md":3,"react":undefined}],6:[function(require,module,exports){
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

},{"react":undefined}],7:[function(require,module,exports){
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

var documentHeight = function documentHeight() {
    return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
};

exports['default'] = _react2['default'].createClass({
    displayName: 'base',

    propTypes: {
        children: _react.PropTypes.node
    },

    getInitialState: function getInitialState() {
        return {
            subLinks: []
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

    render: function render() {
        var scrollTop = window.pageYOffset;
        var totalHeight = documentHeight();
        var scrollBottom = window.innerHeight + window.pageYOffset;

        var headerVisible = headerHeight - scrollTop > 0;
        var footerVisible = totalHeight - scrollBottom < footerHeight;
        var bottom = Math.abs(totalHeight - scrollBottom - footerHeight);

        return _react2['default'].createElement(
            'div',
            { className: 'app', onScroll: this.onScroll },
            _react2['default'].createElement(_header2['default'], null),
            _react2['default'].createElement(
                'div',
                { style: { position: 'relative', minHeight: '100%' } },
                _react2['default'].createElement(_sidebar2['default'], { subLinks: this.state.subLinks, style: {
                        position: headerVisible ? 'absolute' : 'fixed',
                        top: 0,
                        bottom: footerVisible ? bottom : 0
                    } }),
                _react2['default'].createElement(
                    'div',
                    { className: 'app-content' },
                    _react2['default'].cloneElement(this.props.children, {
                        setSublinks: this.setSublinks
                    })
                )
            ),
            _react2['default'].createElement(_footer2['default'], null)
        );
    }
});
module.exports = exports['default'];

},{"./footer":16,"./header":18,"./sidebar":20,"react":undefined}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsPage = require('../../components/page');

var _componentsPage2 = _interopRequireDefault(_componentsPage);

// import * as Basic from './subsections/basic';
// import * as Advanced from './subsections/advanced';

var subsections = [
    // Basic,
    // Advanced
];

exports['default'] = _react2['default'].createClass({
    displayName: 'demo',

    propTypes: {
        children: _react.PropTypes.node,
        setSublinks: _react.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { title: 'Demo',
            className: 'demo',
            subsections: subsections });
    }
});
module.exports = exports['default'];

},{"../../components/page":4,"react":undefined}],9:[function(require,module,exports){
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

var subsections = [Form, Fieldset, Fieldlist, Input, Errors];

exports['default'] = _react2['default'].createClass({
    displayName: 'docs',

    propTypes: {
        children: _react.PropTypes.node,
        setSublinks: _react.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { title: 'Docs',
            className: 'docs',
            subsections: subsections });
    }
});
module.exports = exports['default'];

},{"../../components/page":4,"./subsections/errors":10,"./subsections/fieldlist":11,"./subsections/fieldset":12,"./subsections/form":13,"./subsections/input":14,"react":undefined}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var title = 'Errors';
exports.title = title;
var link = 'errors';

exports.link = link;
var markdown = '\nA component which soaks up and displays form errors. You can think of `Errors` like it is a placeholder. Wherever you place it, errors will be rendered there.\n\n**NB**: Make sure to place this component *within* the `Form` tag.\n\n| Property | Type | Default | Description |\n| :------- | :--- | :------ | :---------- |\n| scoped | boolean | false | **EXPERIMENTAL:** Only displays form errors in relation to the elements nearest parent |\n| additionalErrors | array[string] | [] | Any additional errors you would want to render to the screen can be passed down as an array of strings. |\n| renderError | function(error) => node | identity | If you want to overwrite how errors are rendered, you can do so by providing a callback to errors. This function will receive each error and will return what you want to be rendered as your error. |\n';
exports.markdown = markdown;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var title = 'Fieldlist';
exports.title = title;
var link = 'fieldlist';

exports.link = link;
var markdown = '\n`Fieldlist` uses `Fieldset` under the hood to render each *direct* child it owns. This means if you nest `Fieldset`s within a `Fieldlist`, you will get some extra objects floating around. Similarly to `Fieldset`, validators return the subtree that the `Fieldlist` represents.\n\n| Property | Type | Default| Description |\n| :------- | :--- | :----- | :---------- |\n| validators | array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input |\n| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |\n';
exports.markdown = markdown;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var title = 'Fieldset';
exports.title = title;
var link = 'fieldset';

exports.link = link;
var markdown = '\n`Fieldset`s are where most of the magic happens. They let us group together similar fields into smaller bite-sized objects. We can use these within individual forms, or make reusable form components and use them all over the place.\n\nOne important thing to understand: `Fieldset`s will always make an object with the `name` provided. If you use a `Fieldset` within a `Fieldlist`, you will have a nested object with the name of the `Fieldset`.\n\nOne last thing to keep in mind: you can attach validators to `Fieldset`s. Instead of a primitive passed down as the first param, it will be the subtree that the `Fieldset` represents. Any errors returned from a `Fieldset`s validators will skip `fieldErrors` and go directly to `errors`.\n\n| Property | Type | Default | Description |\n| :------- | :--- | :------ | :---------- |\n| validators |array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input |\n| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |\n\n';
exports.markdown = markdown;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var title = 'Form';
exports.title = title;
var link = 'form';

exports.link = link;
var markdown = '\nThe top level `Form` component is what serializes your data.\n\n| Property | Type | Default | Description |\n| :------- | :--- | :------ | :---------- |\n| onChange| function(form) | undefined | A callback which will be called whenever any child input changes. Receives the serialized form object |\n| onSubmit | function(form) | undefined | A callback which will be called whenever the form is submitted. Receives the serialized form object |\n| showErrorsOnSubmit | boolean | true | A boolean to decide if errors should be shown on submit |\n| showErrorsOnChange | boolean(form) | false | A boolean to decide if errors should be shown on change |\n| validators | array[function(form)] | [] | An array of validators to run over the form. Usefull to capture business logic. Not automatically bound to the form. |\n\n\nThere are a handful of methods on the `Form` component which are useful. To access these, attach a `ref` to the `Form` and call them via `this.refs.refName.methodName();`.\n\n| Method | Params | Description |\n| :----- | :----- | :---------- |\n| serialize | | Returns the serialized form object |\n| showFieldErrors | | Passes down errors to inputs within the form |\n| clearFieldErrors | | Clears errors passed down to inputs within the form |\n';
exports.markdown = markdown;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var title = 'Input';
exports.title = title;
var link = 'input';

exports.link = link;
var markdown = '\nTo integrate inputs with `Form`s, you need to ensure two things.\n\n1. The input has a `getValue` method. This method returns the current value of the input.\n2. The input has to be able to work with your `refs`. This unfortunately means no stateless components.\n\n| Property | Type | Default | Description |\n| :------- | :--- | :------ | :---------- |\n| value | string | undefined | The value of the field |\n| validators |array[function(value, fieldValues, fieldErrors, subtreeErrors)] | [] | An array of validators to run over the input |\n| name | string | undefined | The name of the field which will get serialized. This will get copied over as `ref`. This means `name` _must be unique_, otherwise you will run into collisions. |\n| fieldErrors | array[string] | [] | An array of string errors to pass down to the input. This is automatically filled via the form. You can overwrite this field if you want to manually show an error on an input |\n| validateOnBlur | boolean | false | A boolean which forces the field to wait until it fires a blur event to trigger form validation |\n';
exports.markdown = markdown;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsPage = require('../../components/page');

var _componentsPage2 = _interopRequireDefault(_componentsPage);

// import * as Basic from './subsections/basic';
// import * as Advanced from './subsections/advanced';

var subsections = [
    // Basic,
    // Advanced
];

exports['default'] = _react2['default'].createClass({
    displayName: 'examples',

    propTypes: {
        children: _react.PropTypes.node,
        setSublinks: _react.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { title: 'Examples',
            className: 'examples',
            subsections: subsections });
    }
});
module.exports = exports['default'];

},{"../../components/page":4,"react":undefined}],16:[function(require,module,exports){
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

},{"../components/ghLogo":2,"../components/wtLogo":6,"react":undefined}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsPage = require('../../components/page');

var _componentsPage2 = _interopRequireDefault(_componentsPage);

// import * as Basic from './subsections/basic';
// import * as Advanced from './subsections/advanced';

var subsections = [
    // Basic,
    // Advanced
];

exports['default'] = _react2['default'].createClass({
    displayName: 'getting-started',

    propTypes: {
        children: _react.PropTypes.node,
        setSublinks: _react.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { title: 'Getting Started',
            className: 'getting-started',
            subsections: subsections });
    }
});
module.exports = exports['default'];

},{"../../components/page":4,"react":undefined}],18:[function(require,module,exports){
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

function Header() {
	return _react2['default'].createElement(
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
	);
}

module.exports = exports['default'];

},{"../components/ghLogo":2,"react":undefined,"react-router":undefined}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsPage = require('../../components/page');

var _componentsPage2 = _interopRequireDefault(_componentsPage);

// import * as Basic from './subsections/basic';
// import * as Advanced from './subsections/advanced';

var subsections = [
    // Basic,
    // Advanced
];

exports['default'] = _react2['default'].createClass({
    displayName: 'home',

    propTypes: {
        children: _react.PropTypes.node
    },

    componentWillMount: function componentWillMount() {
        window.scrollTo(0, 0);
    },

    render: function render() {
        return _react2['default'].createElement(_componentsPage2['default'], { title: 'Home',
            className: 'home',
            subsections: subsections });
    }
});
module.exports = exports['default'];

},{"../../components/page":4,"react":undefined}],20:[function(require,module,exports){
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

var links = [{ link: 'getting-started', title: 'Getting Started' }, { link: 'demo', title: 'Demo' }, { link: 'examples', title: 'Examples' }, { link: 'docs', title: 'Docs' }];

function Sidebar(_ref) {
    var _ref$subLinks = _ref.subLinks;
    var subLinks = _ref$subLinks === undefined ? [] : _ref$subLinks;
    var style = _ref.style;

    var activePath = window.location.pathname.split('/').pop();

    var navLinks = links.map(function (_ref2, i) {
        var link = _ref2.link;
        var title = _ref2.title;
        return _react2['default'].createElement(
            'li',
            { key: i },
            _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/' + link, activeClassName: 'active' },
                title
            ),
            activePath === link && _react2['default'].createElement(
                'ul',
                null,
                subLinks.map(function (_ref3, j) {
                    var title = _ref3.title;
                    var link = _ref3.link;
                    return _react2['default'].createElement(
                        'li',
                        { key: i * 10 + j },
                        _react2['default'].createElement(
                            'a',
                            { href: '#' + link },
                            title
                        )
                    );
                })
            )
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
    subLinks: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        title: _react.PropTypes.string,
        link: _react.PropTypes.string
    })).isRequired,
    style: _react.PropTypes.object
};
module.exports = exports['default'];

},{"react":undefined,"react-router":undefined}],21:[function(require,module,exports){
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

var _controllersDemoDemo = require('./controllers/demo/demo');

var _controllersDemoDemo2 = _interopRequireDefault(_controllersDemoDemo);

var _controllersExamplesExamples = require('./controllers/examples/examples');

var _controllersExamplesExamples2 = _interopRequireDefault(_controllersExamplesExamples);

var _controllersDocsDocs = require('./controllers/docs/docs');

var _controllersDocsDocs2 = _interopRequireDefault(_controllersDocsDocs);

var _controllersGettingStartedGettingStarted = require('./controllers/getting-started/getting-started');

var _controllersGettingStartedGettingStarted2 = _interopRequireDefault(_controllersGettingStartedGettingStarted);

exports['default'] = _react2['default'].createElement(
	_reactRouter.Route,
	{ path: '/', component: _controllersBase2['default'] },
	_react2['default'].createElement(_reactRouter.IndexRoute, { component: _controllersHomeHome2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'home', component: _controllersHomeHome2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'demo', component: _controllersDemoDemo2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'examples', component: _controllersExamplesExamples2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'docs', component: _controllersDocsDocs2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { path: 'getting-started', component: _controllersGettingStartedGettingStarted2['default'] })
);
module.exports = exports['default'];

},{"./controllers/base":7,"./controllers/demo/demo":8,"./controllers/docs/docs":9,"./controllers/examples/examples":15,"./controllers/getting-started/getting-started":17,"./controllers/home/home":19,"react":undefined,"react-router":undefined}],22:[function(require,module,exports){
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
},{}]},{},[1]);
