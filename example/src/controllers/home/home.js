import React, { PropTypes } from 'react';
import Page from '../../components/page';
import Well from '../../components/well';
import { Link } from 'react-router';

export default React.createClass({
    propTypes: {
        children: PropTypes.node
    },

    componentWillMount() {
        window.scrollTo(0,0);
    },

    render() {
        return <div className="home">
            <h2>What is react-formable?</h2>

            <p>React-Formable is a form library that gets out of your way. It makes no assumptions on schemas, inputs, structure, or favorite foods.</p>

            <p>Inspiried by functional libraries such as <a href="http://ramdajs.com/" target="_blank">ramdajs</a>, react-formable favors predictable discrete components which you compose together to build complex forms. Nested forms? List forms? Conditional forms that behave certain ways on the full moon? No problem, react-formable has your back.</p>

            <p>Check out the <Link to="/getting-started">getting started</Link> page for installation help. Looking for proof why its so cool? Head on over to our <Link to="/examples">examples</Link> to see whats up!</p>

            <Well className="github-well">
                <h3>Like it? Love it? Want to marry it?</h3>
                <p>Contribute to our repo on GitHub.</p>
                <a className="btn" href="https://github.com/willowtreeapps/react-formable" target="_blank">GitHub</a>
            </Well>
        </div>;
    }
});
