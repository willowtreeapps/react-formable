/*eslint func-style:0*/
import React from 'react';
import { Link } from 'react-router';
import GHLogo from '../components/ghLogo';

export default function Header({ links }) {
    const navLinks = links.map(({ link, title }) =>
        <li key={link}>
            <Link to={`/${link}`} activeClassName="active">
                {title}
            </Link>
        </li>
    );

    return <div>
        <div>
            <header className="header">
                <Link to="/home"><img className="logo" src="./imgs/logo@2x.png" /></Link>
                    <nav>
                        <ul>
                            <li><GHLogo /></li>
                        </ul>
                    </nav>
            </header>
        </div>
        <div className="mobile-nav">
            <ul>{navLinks}</ul>
        </div>
    </div>;
}
