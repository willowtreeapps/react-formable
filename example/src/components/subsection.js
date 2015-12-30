/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';


function renderSubsections(subSections =[]) {
    return subSections.map(subsection => {
        return new Subsection(subsection);
    });
}

export default function Subsection(props) {
    const {
        title='',
        markdown,
        link,
        subSections,
        code: Code
    } = props;


    return <div id={link} className="subsection">
        {title && title.length && <h3>{title}</h3>}

        {markdown && <MD text={markdown} />}

        {Code && <Code />}
        {renderSubsections(subSections)}
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
    ]),
    subSections: PropTypes.array
};
