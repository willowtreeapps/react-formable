import React from 'react';
import Form, { Input } from 'react-formable';
import BasicForm from './BasicForm';

export const title = 'Basic';
export const link = 'basic';

export const markdown = `
This is the basic example, with a few fields and some validation. Start filling out the form to get an understanding of how the form model works.

        <Form>
            <Field />
            <Field />
        </Form>
`;

export const code = function () {
    return <BasicForm />
};
