# react-formable

## Instructions

### Build

`npm run build`

### Dev

`npm start`

Then open localhost:8000 in a browser.


## Installation

**NPM**

    npm install react-formable --save

**Bower**

    bower install react-formable --save

## Docs

http://willowtreeapps.github.io/react-formable/

## Quickstart

We can include the library in several ways.

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

