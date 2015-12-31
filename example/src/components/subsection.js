/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import SimpleSection from './SimpleSection';

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

        {content && <SimpleSection elements={content} />}
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
