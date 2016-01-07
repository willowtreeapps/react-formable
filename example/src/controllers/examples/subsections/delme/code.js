/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import { Form, Input, Errors, Fieldset } from 'react-formable';
const { required, equalsField } = require('react-formable').validators;

export default function SignupForm({ onChange }) {
    return <Form onChange={onChange}>
        <Errors className="formErrors" />

        <label>
            User name *
            <Input name="username"
                   type="text"
                   validators={[
                       required('username is required')
                   ]} />
        </label>

        <label>
            Password *
            <Input name="password"
                   type="password"
                   validators={[
                       required('password is required')
                   ]} />
        </label>

        <label>
            Password Retype *
            <Input name="password2"
                   type="password"
                   validators={[
                       equalsField('password', 'passwords must match')
                   ]} />
        </label>

        <Fieldset name="pet">
            <label>
                Pet Name
                <Input name="name"
                       type="text"
                       validators={[
                           required('pet name is required')
                       ]} />
            </label>
            <label>
                Pet Color
                <Input name="color"
                       type="text"
                       validators={[
                           required('pet color is required')
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
