import React from 'react';
import BasicForm from './BasicForm';

export const title = 'Basic';
export const link = 'basic';

export const markdown = `Here is a simple form. It's got a couple of fields and a bit of validation, easy right?</p>`;

export const code = function () {
    return <BasicForm />
};
