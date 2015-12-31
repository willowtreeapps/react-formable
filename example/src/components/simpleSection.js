/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';

/*
 * A simple section that displays the array of elements it is given.
 *
 * - string elements treated as markdown
 * - all other components treated as Reactable
 */
export default function SimpleSection(props) {
    const {
        elements
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
