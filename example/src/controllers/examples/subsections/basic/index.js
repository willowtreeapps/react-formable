import React from 'react';
import FormExample from '../../../../components/codeExample';
import BasicFormExample from './code';
const fs = require('fs');
const BasicFormCode = fs.readFileSync(`${__dirname}/code.js`, 'utf8');

export const title = 'Basic';
export const link = 'basic';
export const markdown = fs.readFileSync(`${__dirname}/description.md`, 'utf8');
export const code = function () {
    return <FormExample code={BasicFormCode} example={BasicFormExample} />;
};
