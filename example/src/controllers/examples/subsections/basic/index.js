import React from 'react';
import SimpleSection from '../../../../components/SimpleSection';

export const title = 'Basic';
export const link = 'basic';
export const markdown = require('../../samples').markdown.basic
export const code = require('../../samples').code.basic


/*eslint func-style:0*/
export function content() {
    return <SimpleSection markdown={markdown} code={code} />
}
