import React, { PropTypes } from 'react';

/*eslint func-style:0*/
export default function Button(props) {
    return <span className={`${props.className} btn`} {...props}>
        {props.children}
    </span>
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

Button.defaultProps = {
    className: ''
};
