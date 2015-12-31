/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';

/*
 * A componment which displays an array of elements
 *
 * - string elements treated as markdown
 * - all other components treated as Reacty
 */
export default function SimpleSection(props) {
    const {
        elements=[]
    } = props;

    return <div>
        {elements.map(Element => {
            if (typeof Element === 'string') {
                return <MD text={Element} />
            }
            if (typeof Element === 'function') {
                return <Element />
            }
        })}
    </div>;
}

SimpleSection.propTypes = {
    elements: PropTypes.array
};
