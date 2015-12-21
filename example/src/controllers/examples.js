import React, { PropTypes } from 'react';
import Form, { Input, Fieldset, Errors, Fieldlist } from 'react-formable';

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks([
            { name: 'subexample', to: 'subexample' },
            { name: 'subexample1', to: 'subexample1' }
        ]);
    },

    validators: [
        ({ errors }) => errors.length ? 'DOUBLE BAD' : null
    ],

    render() {
        return <div className="examples">
            Examples
            <Form ref="form"
                  showErrorsOnChange
                  validators={this.validators}>
                <Input name="name" validators={[val => val.length > 3 ? 'bad' : null]} />
                <Errors  />
            </Form>
        </div>;
    }
});
