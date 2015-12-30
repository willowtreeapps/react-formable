/*eslint prefer-template:0*/
import FormExample from '../../components/codeExample';
import React from 'react';
import mapObj from '../../../../src/helpers/mapObj';

const codeTextFiles = {
    basic: require('fs').readFileSync(__dirname + '/subsections/basic/code.js', 'utf8')
};

const codeComponents = {
    basic: require('./subsections/basic/code')
};

export const markdown = {
    basic: require('fs').readFileSync(__dirname + '/subsections/basic/description.md', 'utf8')
};

// Map over each of our codeX imports and make a FormExample for it. The
// values here are just statles functions
export const code = mapObj(
	(value, key) => () => <FormExample code={codeTextFiles[key]} example={codeComponents[key]} />,
	codeTextFiles
);
