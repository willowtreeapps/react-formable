import React, { PropTypes } from 'react';

const identity = (x) => x;

export default React.createClass({
    propTypes: {
        fieldErrors: PropTypes.arrayOf(PropTypes.string),
        validateOnBlur: PropTypes.bool,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        className: PropTypes.string
    },

    getDefaultProps() {
        return {
            onBlur: identity,
            onChange: identity,
            onSubmit: identity,
            className: ''
        };
    },

    getValue() {
        return this.refs.input.value;
    },

    onBlur() {
        if (this.props.validateOnBlur) {
            this.props.onChange();
        }

        this.props.onBlur();
    },

    render() {
        const hasError = this.props.fieldErrors && this.props.fieldErrors.length;
        const className = `${this.props.className} ${hasError ? 'error' : ''}`;

        return <input {...this.props}
                      className={className}
                      onBlur={this.onBlur}
                      onChange={this.props.onChange}
                      ref="input" />
    }
});
