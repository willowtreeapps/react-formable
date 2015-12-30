/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import Code from './code';

/**
 * A component used to pretty display JSON using Markdown
 */
export default function JSONViewer({ data }) {
    return <Code>{JSON.stringify(data, null, 2)}</Code>;
}

JSONViewer.propTypes = {
    data: PropTypes.object.isRequired
};

JSONViewer.defaultProps = {
    data: 'Empty object'
};

