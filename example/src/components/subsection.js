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
        subSections=[],
        content
    } = props;

    return <div id={link} className="subsection">
        {title && title.length && <h3>{title}</h3>}

        {content && content.map(Content => {
            if (typeof Content === 'string') {
                return <MD text={Content} />
            }
            if (typeof Content === 'function') {
                return <Content />
            }
        })}
        {subSections.map((subSection) => {
            return <Subsection key={subSection.link} {...subSection} />;
        })}
    </div>;
}

Subsection.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.array,
    subSections: PropTypes.array
};
