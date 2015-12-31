/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';

/*
 * A simple section that displays some Markdown and some code. Covers most use
 * cases for site documentation.
 */
export default function SimpleSection(props) {
    const {
        markdown,
        code: Code
    } = props;

    return <div>
        {markdown && <MD text={markdown} />}
        {Code && <Code />}
    </div>;
}

SimpleSection.propTypes = {
    markdown: PropTypes.string,
    code: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ])
};
