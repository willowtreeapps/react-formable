/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';
import Waypoint from 'react-waypoint';

export default function Subsection(props) {
    const {
        title='',
        markdown,
        link,
        code: Code
    } = props;

    return <div id={link} className="subsection">
        <Waypoint onEnter={() => console.log(`onEnter: ${link}`)}
                  onLeave={() => console.log(`onLeave: ${link}`)}
                  threshold={1} />

        {title && title.length && <h3>{title}</h3>}

        {markdown && <MD text={markdown} />}

        {Code && <Code />}
    </div>;
}

Subsection.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    link: PropTypes.string,
    markdown: PropTypes.string,
    code: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ])
};
