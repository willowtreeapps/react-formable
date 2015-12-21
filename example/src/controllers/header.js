import React, { PropTypes } from 'react';

export default React.createClass({
    propTypes: {
        children: PropTypes.node
    },

    render() {
        return <header className="header">
			<h1>Willowtree</h1>
			<nav>
				<ul>
					<li><a href="http://willowtreeapps.github.io/react-formable/" target="_blank"><i className="fa fa-github"></i></a></li>
					<li><a href="#"><i className="fa fa-twitter"></i></a></li>
				</ul>
			</nav>
        </header>;
    }
});
