/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';

export default function Subsection(props) {
    const {
        title='Subsection',
        markdown,
        link
    } = props;

    return <div id={link} className="subsection">
        <h3>{title}</h3>

        {markdown && <MD text={markdown} />}
    </div>;
}

Subsection.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    link: PropTypes.string,
    markdown: PropTypes.string,
    code: PropTypes.node
};
