/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import { Form, Input, Errors, Fieldset } from 'react-formable';
const { required, equalsField } = require('react-formable').validators;

export default function SignupForm({ onChange }) {
    return <Form onChange={onChange}>
        <Errors className="formErrors" />

        <label>
            Name
            <Input name="name"
                   type="text"
                   validators={[
                       required('name is required')
                   ]} />
        </label>

        <h4>Address</h4>
        <Fieldset name="address">
            <label>
                Building
                <Input name="building"
                       type="text"
                       validators={[
                           required('building is required')
                       ]} />
            </label>
            <label>
                Street
                <Input name="street"
                       type="text"
                       validators={[
                           required('street is required')
                       ]} />
            </label>
            <label>
                Zip
                <Input name="zip"
                       type="text"
                       validators={[
                           required('zip is required')
                       ]} />
            </label>
        </Fieldset>

        <input type="submit" value="Submit" />
    </Form>;
}

SignupForm.propTypes = {
    onChange: PropTypes.func
};

export const source = require('fs').readFileSync(__filename, 'utf8');
