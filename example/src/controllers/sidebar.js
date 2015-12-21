import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        subLinks: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            to: PropTypes.string
        })).isRequired
    },

    render() {
        const [,activePath] = window.location.pathname.split('/');

        const links = [
            { to: 'home', name: 'react-formable' },
			{ to: 'getting-started', name: 'Getting Started' },
			{ to: 'demo', name: 'Demo' },
			{ to: 'examples', name: 'Examples' },
			{ to: 'docs', name: 'Docs' }
        ];

        const navLinks = links.map(({ to, name }, i) =>
            <li key={i}>
                <Link to={`/${to}`} activeClassName="active">
                    {name}
                </Link>

                {activePath === to && <ul>
                    {this.props.subLinks.map(({ name, to }, j) =>
                        <li key={i * 10 + j}>
                            <a id={to} href={`#${to}`}>{name}</a>
                        </li>
                    )}
                </ul>}
            </li>
        );


        return <nav className="sidebar">
			<ul>
                {navLinks}
			</ul>
        </nav>;
    }
});
