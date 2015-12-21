import React, { PropTypes } from 'react';
import Form, { Input, Errors } from 'react-formable';
import { description } from '../examples/basic';

import MD from '../components/md';

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

            <MD text={description} />

            Cool!

            <Form ref="form"
                  showErrorsOnChange
                  validators={this.validators}>
                <Input name="name" validators={[val => val.length > 3 ? 'bad' : null]} />
                <Errors  />
            </Form>
        </div>;
    }
});
