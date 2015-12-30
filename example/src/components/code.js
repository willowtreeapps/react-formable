/*eslint func-style:0*/
import React, { PropTypes } from 'react';

export default function Code({ children }) {
    const html = window.hljs.highlightAuto(children).value;
    return <pre dangerouslySetInnerHTML={{ __html: html }} />;
}

Code.propTypes = {
    children: PropTypes.node.isRequired
};

