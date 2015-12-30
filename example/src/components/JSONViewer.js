/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import Code from './code';

export default function JSONViewer({ data }) {
    return <Code>{JSON.stringify(data, null, 2)}</Code>;
}

JSONViewer.propTypes = {
    data: PropTypes.object.isRequired
};
