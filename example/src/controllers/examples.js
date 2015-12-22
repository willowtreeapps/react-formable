import React, { PropTypes } from 'react';
import Form, { Input, Fieldset, Errors, Fieldlist } from 'react-formable';
import BasicExample from '../examples/BasicExample.js'

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks([
            { name: 'Basic form', to: 'basicexample' }
        ]);
    },

    validators: [
        ({ errors }) => errors.length ? 'DOUBLE BAD' : null
    ],

    renderbasicForm() {
        return <BasicExample />;
    },

    render() {
        return <div className="examples">
            Examples
            <Form ref="form"
                  showErrorsOnChange
                  validators={this.validators}>
                <Input name="name" validators={[val => val.length > 3 ? 'bad' : null]} />
                <Errors  />
            </Form>
            {this.renderbasicForm()}
        </div>;
    }
});
