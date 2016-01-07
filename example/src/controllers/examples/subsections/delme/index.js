/*eslint prefer-template:0*/
import React from 'react';
import FormExample from '../../../../components/formExample';
import SignupForm, { source } from './code';

const code = () => <FormExample example={SignupForm} code={source} />;
const markdown = require('fs').readFileSync(__dirname + '/description.md', 'utf8');

export const content = [markdown, code];
export const title = 'Delme';
export const link = 'Delme';
