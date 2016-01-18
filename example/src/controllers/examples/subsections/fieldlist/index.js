/*eslint prefer-template:0*/
import React from 'react';
import FormExample from '../../../../components/formExample';
import Fieldlist, { source } from './code';

const code = () => <FormExample example={Fieldlist} code={source} />;
const markdown = require('fs').readFileSync(__dirname + '/description.md', 'utf8');

export const content = [markdown, code];
export const title = 'Fieldlist';
export const link = 'Fieldlist';
