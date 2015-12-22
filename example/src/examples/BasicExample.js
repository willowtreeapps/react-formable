import React, { PropTypes } from 'react';
import { Form, Input, Fieldset, Fieldlist, Errors } from 'react-formable';
import FormData from './FormData';

export default class BasicExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: null
        };
    }

    onChange(form) {
        this.setState({
            formData: form
        })
    }

    render() {
        return <div>
        <Form ref="form" onChange={this.onChange.bind(this)}>
            Username: <Input name="username" type="text" />
        </Form>
        <FormData data={this.state.formData} />
        </div>;
    }

}
