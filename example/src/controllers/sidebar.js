/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const links = [
	{ link: 'getting-started', title: 'Getting Started' },
	{ link: 'guides', title: 'Guides' },
	{ link: 'examples', title: 'Examples' },
	{ link: 'api', title: 'API' }
];

function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function renderSublinks(subLinks) {
    return <ul>
        {subLinks.map(({ title, link, subsections }) => {
            return <li key={link}>
                <span className="a" onClick={scrollToId.bind(this, link)}>
                    {title}
                </span>
                {subsections && renderSublinks(subsections)}
            </li>
        })}
    </ul>
}

export default function Sidebar({ subLinks=[], style, activePath }) {
    activePath = activePath.split('/').pop();

    const navLinks = links.map(({ link, title }) =>
        <li key={link}>
            <Link to={`/${link}`} activeClassName="active">
                {title}
            </Link>

            {activePath === link && renderSublinks(subLinks)}
        </li>
    );

    return <nav className="sidebar" style={style}>
		<ul>
            {navLinks}
		</ul>
    </nav>;
}

Sidebar.propTypes = {
    subLinks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        link: PropTypes.string
    })).isRequired,
    style: PropTypes.object
};
