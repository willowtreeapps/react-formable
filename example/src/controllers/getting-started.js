import React, { PropTypes } from 'react';

export default React.createClass({
    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks([]);
    },


    render() {
        return <div className="getting-started">
            Getting Started
        </div>;
    }
});
