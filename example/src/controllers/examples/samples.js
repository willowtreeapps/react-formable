/*eslint prefer-template:0*/
import FormExample from '../../components/codeExample';
import React from 'react';

const codes = {
    basic: require('fs').readFileSync(__dirname + '/subsections/basic/code.js', 'utf8')
};

const examples = {
    basic: require('./subsections/basic/code')
};

export const markdown = {
    basic: require('fs').readFileSync(__dirname + '/subsections/basic/description.md', 'utf8')
};

export const code = {
    basic: () => <FormExample code={codes.basic} example={examples.basic} />
}
