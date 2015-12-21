/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import marked from 'marked';
import pygmentize from 'pygmentize-bundled';

marked.setOptions({
    highlight: function (code, lang, callback) {
        pygmentize({ lang: lang, format: 'html' }, code,  (err, result) => {
            callback(err, result.toString());
        });
    }
});

export default function MarkdownViewer(props) {
    const html = marked(props.text || '', { sanitize: true });

    return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />
}

MarkdownViewer.propTypes = {
    text: PropTypes.string
};
