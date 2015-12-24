import React from 'react';
import { Form, Input, Errors } from 'react-formable';
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

    onSubmit(form) {
        if (form.valid)
            alert('Tada!');
    }

    //TODO: replace this with a stock validator once it's written
    requiredValidator(value) {
        if (!value)
            return 'Required field missing!';
    }

    render() {
        const inputStyles = {
            marginLeft: '10'
        }

        return <div style={{ paddingTop: 15 }}>
            <p>Here is a simple form. It's got a couple of fields and a bit of validation, easy right?</p>
            <Form ref="form" onChange={this.onChange.bind(this)}
                onSubmit={this.onSubmit.bind(this)}>
                <Errors />
                <div>
                    <label>First name *</label>
                    <Input name="firstname" type="text"
                        validators={[this.requiredValidator]}
                        style={inputStyles} />
                </div>
                <div>
                    <label>Last name *</label>
                    <Input name="lastname" type="text"
                        validators={[this.requiredValidator]}
                        style={inputStyles} />
                </div>
                <div>
                    <label>Phone number</label>
                    <Input name="phone" type="text"
                        style={inputStyles} />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </Form>
            <br />
            <FormData data={this.state.formData} />
        </div>;
    }

}