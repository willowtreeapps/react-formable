/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';
import Waypoint from 'react-waypoint';

/*
 * Represents some site content
 */
export default function Subsection(props) {
    const {
        title='',
        link,
        subsections=[],
        content,
        setActiveSublink
    } = props;

    return <div id={link} className="subsection">

        <Waypoint onEnter={() => setActiveSublink(link)} />

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
            return <Subsection key={subsection.link}
                               setActiveSublink={setActiveSublink}
                               {...subsection} />;
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
    subsections: PropTypes.array,
    setActiveSublink: PropTypes.func
};
