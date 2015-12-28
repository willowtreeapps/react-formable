import React, { PropTypes } from 'react';
import Page from '../../components/page';
//import * as Basic from './subsections/basic';
// import * as Advanced from './subsections/advanced';

const subsections = [
    //Basic,
    // Advanced
];

const description = `
Looking to get started with react-formable? Awesome!

## Installation

**NPM**

    npm install react-formable --save

**Bower**

    bower install react-formable --save

## Quickstart

    // ES6 Imports
    import Form, { Input, Errors } from 'react-formable';

    // require
    var Formable = require('react-formable');
    var Form = Formable.Form;
    var Input = Formable.Input;
    var Errors = Formable.Errors;

    // require with de-structuring
    var { Form, Input, Errors } = require('react-formable');

Now lets render a simple login form that will display errors.

    const LoginForm = React.createClass({
        onSubmit(form) {
            console.log(form);
        },

        render() {
            return <Form onSubmit={this.onSubmit}>
                <Input name="username" type="text" />
                <Input name="password" type="password" />
                <button>Login</button>
                <Errors />
            </Form>;
        }
    });
`;

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0,0);
    },

    render() {
        return <Page title="Getting Started"
                     description={description}
                     className="getting-started"
                     subsections={subsections} />
    }
});
