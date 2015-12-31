/*eslint prefer-template:0*/
import FormExample from '../../components/formExample';
import React from 'react';
import mapObj from '../../../../src/helpers/mapObj';

export const markdown = {
    'form-walk-through': require('fs').readFileSync(__dirname + '/subsections/form-walk-through/description.md', 'utf8'),
    fieldset: require('fs').readFileSync(__dirname + '/subsections/fieldset/description.md', 'utf8'),
    fieldlist: require('fs').readFileSync(__dirname + '/subsections/fieldlist/description.md', 'utf8'),
    'adding-validation': require('fs').readFileSync(__dirname + '/subsections/adding-validation/description.md', 'utf8'),
    'displaying-errors': require('fs').readFileSync(__dirname + '/subsections/displaying-errors/description.md', 'utf8')
};

const codeTextFiles = {
    'form-walk-through': require('fs').readFileSync(__dirname + '/subsections/form-walk-through/code.js', 'utf8')
};

const codeComponents = {
    'form-walk-through': require('./subsections/form-walk-through/code')
};

// Map over each of our code imports and make a FormExample for it. The
// values here are just stateless functions
export const code = mapObj(
	(value, key) => () => <FormExample code={codeTextFiles[key]}
                                       example={codeComponents[key]}
                                       showCode />,
	codeTextFiles
);
