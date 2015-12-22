/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import marked from 'marked';

marked.setOptions({
    highlight: code => window.hljs.highlightAuto(code).value
});

export default function MarkdownViewer(props) {
    const html = marked(props.text || props.children || '', { sanitize: true });
    const { children, ...divProps } = props;

    return <div {...divProps} dangerouslySetInnerHTML={{ __html: html }} />
}

MarkdownViewer.propTypes = {
    text: PropTypes.string,
    children: PropTypes.node
};
