import React, { PropTypes } from 'react';
import Page from '../../components/page';
// import * as Basic from './subsections/basic';
// import * as Advanced from './subsections/advanced';

const subsections = [
    // Basic,
    // Advanced
];

export default React.createClass({
    propTypes: {
        children: PropTypes.node
    },

    componentWillMount() {
        window.scrollTo(0,0);
    },

    render() {
        return <Page title="Home"
                     className="home"
                     subsections={subsections} />
    }
});
