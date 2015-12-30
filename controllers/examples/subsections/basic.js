import React from 'react';
//import fs from 'fs';
var fs = require('fs');
import BasicFormExample from './BasicForm';
const BasicFormCode = fs.readFileSync(__dirname + '/BasicForm.js', 'utf8');
import FormExample from '../../../components/codeExample';

export const title = 'Basic';
export const link = 'basic';

export const markdown = `
Here is a simple form. It's got a couple of fields and a bit of validation, easy right?
`;

export const code = function() {
    return <FormExample code={BasicFormCode} example={BasicFormExample} name={__dirname + '/BasicForm'} />;
};
