/*eslint func-style:0*/
import React, { PropTypes } from 'react';

/*
 * Represents some site content
 */
export default function Subsection(props) {
    const {
        title='',
        link,
        subSections=[],
        content: Content
    } = props;

    return <div id={link} className="subsection">
        {title && title.length && <h3>{title}</h3>}

        {Content && <Content />}
        {subSections.map((subSection) => {
            return <Subsection key={subSection.link} {...subSection} />;
        })}
    </div>;
}

Subsection.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    subSections: PropTypes.array
};
