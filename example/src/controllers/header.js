/*eslint func-style:0*/
import React from 'react';
import { Link } from 'react-router';

export default function Header() {
    return <header className="header">
		<h1><Link to="/home">react-formable</Link></h1>

		<nav>
			<ul>
				<li><a href="http://willowtreeapps.github.io/react-formable/" target="_blank"><i className="fa fa-github"></i></a></li>
				<li><a href="#"><i className="fa fa-twitter"></i></a></li>
			</ul>
		</nav>
    </header>;
}
