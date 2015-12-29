import React, { PropTypes } from 'react';
import Page from '../../components/page';

const subsections = [
];

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks(subsections);
        window.scrollTo(0,0);
    },

    render() {
        return <Page className="guides"
                     subsections={subsections} />
    }
});
