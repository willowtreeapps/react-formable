import React, { PropTypes } from 'react';

/*eslint func-style:0*/
export default function Well(props) {
    return <div {...props} className={`${props.className} well`}>
        {props.children}
    </div>
}

Well.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

Well.defaultProps = {
    className: ''
};
