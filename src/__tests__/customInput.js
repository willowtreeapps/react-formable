import React from 'react';

/* eslint react/prop-types:0 */
export default React.createClass({
    getInitialState() {
        return {
            value: false
        };
    },

    getValue() {
        return this.state.value;
    },

    onChange() {
        this.setState({ value: !this.state.value }, () => {
            this.props.onChange(this.getValue());
        });
    },

    render() {
        return <div onClick={this.onChange} className={this.props.className}>
            {this.state.value ? 'True' : 'False'}
        </div>;
    }
});
