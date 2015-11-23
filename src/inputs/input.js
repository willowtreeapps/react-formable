import React, { PropTypes } from 'react';

const identity = function(x) { return x; };

export default React.createClass({
    propTypes: {},

    getDefaultProps() {
        return {
            onChange: identity,
            onSubmit: identity
        };
    },

    serialize() {
        return this.refs.input.value;
    },

    render() {
        return <input ref="input"
                      {...this.props}
                      onChange={this.onChange} />
    }
});
