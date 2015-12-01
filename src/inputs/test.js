import React, { PropTypes } from 'react';

const identity = function(x) { return x; };

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        // this.validators = [
        //     function(val) { console.log(val); }
        // ];
    }

    // validators = [
    //     function(val) { console.log(val); }
    // ]

    serialize() {
        return this.refs.input.value;
    }

    render() {
        return <input ref="input" {...this.props} />
    }
}
