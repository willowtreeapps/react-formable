/*eslint prefer-template:0*/
import FormExample from '../../components/formExample';
import React from 'react';
import mapObj from '../../../../src/helpers/mapObj';

const codeTextFiles = {
    basic: require('fs').readFileSync(__dirname + '/subsections/basic/code.js', 'utf8'),
    signup: require('fs').readFileSync(__dirname + '/subsections/signup/code.js', 'utf8')
};

const codeComponents = {
    basic: require('./subsections/basic/code'),
    signup: require('./subsections/signup/code')
};

export const markdown = {
    basic: require('fs').readFileSync(__dirname + '/subsections/basic/description.md', 'utf8'),
    signup: require('fs').readFileSync(__dirname + '/subsections/signup/description.md', 'utf8')
};

// Map over each of our codeX imports and make a FormExample for it. The
// values here are just statles functions
export const code = mapObj(
	(value, key) => () => <FormExample code={codeTextFiles[key]} example={codeComponents[key]} />,
	codeTextFiles
);
