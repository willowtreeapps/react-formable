/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import marked from 'marked';

marked.setOptions({
    highlight: code => window.hljs.highlightAuto(code).value
});

export default function MarkdownViewer(props) {
    const html = marked(props.text || '', { sanitize: true });

    return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />
}

MarkdownViewer.propTypes = {
    text: PropTypes.string
};
