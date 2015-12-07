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

    getValue() {
        return this.refs.input.value;
    },

    render() {
        const hasError = this.props.errors && this.props.errors.length;

        const style = {
            border: `1px solid ${hasError ? 'red' : 'black'}`
        };

        return <input {...this.props}
                      ref="input"
                      style={style} />
    }
});
