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

    componentDidMount() {
        setTimeout(() => {
            //TODO trigger a form onchange to get the state up
        }, 100);
    }

    onChange(form) {
        this.setState({
            formData: form
        })
    }

    requiredValidator(value) {
        if (!value)
            return 'Required field! D:';
    }

    render() {
        const inputStyles = {
            marginLeft: '10'
        }

        return <div>
        <h4>Basic Form</h4>
        <br />
        <p>This ones got a couple of fields and some validation to make sure that all fields are filled out.</p>
        <p>Start filling out the form and watch how the form data model is maintained below</p>
        <Form ref="form" onChange={this.onChange.bind(this)}
            showErrorsOnChange={true}>
            <div>
                <label>First name</label>
                <Input name="firstname" type="text"
                    validators={[this.requiredValidator]}
                    style={inputStyles} />
            </div>
            <div>
                <label>Last name</label>
                <Input name="lastname" type="text"
                    validators={[this.requiredValidator]}
                    style={inputStyles} />
            </div>
            <Errors />
        </Form>
        <br />
        <FormData data={this.state.formData} />
        </div>;
    }

}
