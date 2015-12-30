import React from 'react';
import { Form, Input, Errors } from 'react-formable';
const { required } = require('react-formable').validators;

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

        this.props.onChange(form);
    }

    onSubmit(form) {
        this.setState({
            success: form.valid,
            data: form
        })

        this.props.onSubmit(form);
    }

    renderSuccess() {
        if (this.state.success) {
            return <div className="formSuccess">Form submitted</div>;
        }
    }

    render() {
        return <div className="exampleForm">
            <Form ref="form" onChange={this.onChange.bind(this)}
                onSubmit={this.onSubmit.bind(this)}>
                <Errors className="formErrors" />
                {this.renderSuccess()}
                <div>
                    <label>First name *</label>
                    <Input name="firstname" type="text"
                        validators={[required('First name is required')]} />
                </div>
                <div>
                    <label>Last name *</label>
                    <Input name="lastname" type="text"
                        validators={[required('Last name is required')]} />
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
        </div>;
    }
}

