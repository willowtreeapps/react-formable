/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';

/*
 * Represents some site content
 */
export default function Subsection(props) {
    const {
        title='',
        link,
        subsections=[],
        content
    } = props;

    return <div id={link} className="subsection">
        {title && title.length && <h3>{title}</h3>}

        {content && content.map((Content, i) => {
            if (typeof Content === 'string') {
                return <MD key={i} text={Content} />
            }
            if (typeof Content === 'function') {
                return <Content key={i} />
            }
        })}
        {subsections.map((subsection) => {
            return <Subsection key={subsection.link} {...subsection} />;
        })}
    </div>;
}

Subsection.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.string
        ])
    ),
    subsections: PropTypes.array
};
