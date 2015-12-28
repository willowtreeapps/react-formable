import React from 'react';
import { Form, Input, Errors } from 'react-formable';
import JSONViewer from '../../../components/JSONViewer';

export default class BasicForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false
        }
    }

    onChange(form) {
        this.setState({
            data: form
        })
    }

    onSubmit(form) {
        this.setState({
            success: form.valid,
            data: form
        })
    }

    //TODO: replace this with a stock validator once it's written
    requiredValidator(message) {
        return (value) => {
            if (!value)
                return message || 'Required field missing!';
        }
    }

    renderSuccess() {
        if (this.state.success) {
            return <div className="formSuccess">Form submitted</div>;
        }
    }

    render() {
        return <div className="exampleForm">
            <h3>The Form</h3>
            <Form ref="form" onChange={this.onChange.bind(this)}
                onSubmit={this.onSubmit.bind(this)}>
                <Errors className="formErrors" />
                {this.renderSuccess()}
                <div>
                    <label>First name *</label>
                    <Input name="firstname" type="text"
                        validators={[this.requiredValidator('First name is required')]} />
                </div>
                <div>
                    <label>Last name *</label>
                    <Input name="lastname" type="text"
                        validators={[this.requiredValidator('Last name is required')]} />
                </div>
                <div>
                    <label>Phone number</label>
                    <Input name="phone" type="text" />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </Form>
            <br />
            <h3>The Form Model</h3>
            <JSONViewer {...this.state} />
        </div>;
    }

}
