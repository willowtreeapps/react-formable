/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Smooth from '../components/smoothLink';

const links = [
	{ link: 'getting-started', title: 'Getting Started' },
	{ link: 'demo', title: 'Demo' },
	{ link: 'examples', title: 'Examples' },
	{ link: 'docs', title: 'Docs' }
];

export default function Sidebar({ subLinks=[], style }) {
    const activePath = window.location.pathname.split('/').pop();

    const navLinks = links.map(({ link, title }, i) =>
        <li key={i}>
            <Link to={`/${link}`} activeClassName="active">
                {title}
            </Link>

            {activePath === link && <ul>
                {subLinks.map(({ title, link }, j) =>
                    <li key={i * 10 + j}>
						<Smooth link={link} title={title} />
                    </li>
                )}
            </ul>}
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
