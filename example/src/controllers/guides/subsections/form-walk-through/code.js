/*eslint func-style:0*/
import React from 'react';
import Form, { Input } from 'react-formable';

export default function PersonForm({ onChange }) {
    return <Form onChange={onChange}>
        <label> Name: <Input name="name" type="text" /> </label>
        <label> Age: <Input name="age" type="text" /> </label>
        <label> Pet: <Input name="pet" type="text" /> </label>
        <button>Submit</button>
    </Form>;
}
