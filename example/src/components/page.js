/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';
import Subsection from './subsection';

export default function Page(props) {
    const {
        title='',
        className='',
        description,
        subsections=[],
        setActiveSublink
    } = props;

    return <div className={`${className} page`}>
        {title && title.length && <h1>{title}</h1>}
        {description && <MD text={description} />}
        {subsections.map((subsection, i) =>
            <Subsection key={i} {...subsection}
                        setActiveSublink={setActiveSublink}/>
         )}
    </div>;
}

Page.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    subsections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.string
            ])
        )
    })),
    setActiveSublink: PropTypes.func
};
