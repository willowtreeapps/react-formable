/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';
import Subsection from './subsection';

export default function Page(props) {
    const {
        title='Title',
        className='',
        description,
        subsections=[]
    } = props;

    return <div className={`${className} page`}>
        <h1>{title}</h1>
        {description && <MD text={description} />}
        {subsections.map((subsection, i) => <Subsection key={i} {...subsection} />)}
    </div>;
}

Page.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    subsections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        markdown: PropTypes.string,
        code: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func
        ])
    }))
};
