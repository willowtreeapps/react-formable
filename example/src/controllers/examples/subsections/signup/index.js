import React from 'react';
import SimpleSection from '../../../../components/SimpleSection';

export const title = 'Signup';
export const link = 'Signup';
export const markdown = require('../../samples').markdown.signup
export const code = require('../../samples').code.signup

/*eslint func-style:0*/
export function content() {
    return <SimpleSection markdown={markdown} code={code} />
}
