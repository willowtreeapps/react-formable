/*eslint func-style:0*/

import React, { PropTypes } from 'react';
import { Form, Input, Errors, Fieldset } from 'react-formable';
const { required } = require('react-formable').validators;

export default function BasicForm({ onChange }) {
    return <Form onChange={onChange}>
        <Errors className="formErrors" />

        <label>
            First name *
            <Input name="firstname"
                   type="text"
                   validators={[
                       required('First name is required')
                   ]} />
        </label>

        <label>
            Last name *
            <Input name="lastname"
                   type="text"
                   validators={[
                       required('Last name is required')
                   ]} />
        </label>

        <label>
            Phone number
            <Input name="phone" type="text" />
        </label>

        <Fieldset name="pet">
            <label> Pet Name: <Input name="name" type="text" /> </label>
            <label> Pet Type: <Input name="type" type="text" /> </label>
        </Fieldset>

        <input type="submit" value="Submit" />
    </Form>;
}

BasicForm.propTypes = {
    onChange: PropTypes.func
};
