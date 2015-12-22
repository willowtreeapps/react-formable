import React, { PropTypes } from 'react';
import BasicExample from '../examples/BasicExample.js'

export default React.createClass({

    propTypes: {
        children: PropTypes.node,
        setSublinks: PropTypes.func
    },

    componentWillMount() {
        this.props.setSublinks([
            { name: 'Basic form', to: 'basicexample' }
        ]);
    },

    render() {
        return <div className="examples">
            <h2>Examples</h2>
            <BasicExample />
        </div>;
    }
});
