import React, { PropTypes } from 'react';

const identity = (x) => x;

export default React.createClass({
    propTypes: {
        fieldErrors: PropTypes.arrayOf(PropTypes.string),
        validateOnBlur: PropTypes.bool,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        className: PropTypes.string
    },

    getDefaultProps() {
        return {
            onChange: identity,
            onSubmit: identity,
            className: ''
        };
    },

    getValue() {
        return this.refs.input.value;
    },

    onChange(e) {
        if(!this.props.validateOnBlur) {
            this.props.onChange(e);
        }
    },

    onBlur() {
        if (this.props.validateOnBlur) {
            this.props.onChange();
        }
    },

    render() {
        const hasError = this.props.fieldErrors && this.props.fieldErrors.length;
        const className = `${this.props.className} ${hasError ? 'error' : ''}`;

        return <input {...this.props}
                      className={className}
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      ref="input" />
    }
});
