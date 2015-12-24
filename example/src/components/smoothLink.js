/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import smoothScroll from 'smoothscroll';

export default function SmoothLink({ link, title }) {
    function onClick() {
        smoothScroll(document.querySelector(`#${link}`));
    }

    return <a href={`#${link}`} onClick={onClick}>{title}</a>;
}

SmoothLink.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string
};
