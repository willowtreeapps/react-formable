import React, { PropTypes } from 'react';
import cloneChildren from './helpers/cloneChildren';
import values from './helpers/values';
import identity from './helpers/identity';

export default React.createClass({
    displayName: 'Fieldset',

    getInputs() {
        return {
            ref: this,
            refs: values(this.refs || {})
                    .filter(ref => (ref.getInputs || ref.getValue))
                    .map(ref => ref.getInputs ? ref.getInputs() : { ref })
                    .reduce((memo, node) => {
                        memo[node.ref.props.name] = node;
                        return memo;
                    }, {})
        };
    },

    render() {
        let childNames = [];
        const clonePred = child => child.props && child.props.name;
        const cloneProps = child => {
            if (child.ref) console.warn(`Attempting to attach ref "${child.ref}" to "${child.props.name}" will be bad for your health`, child);
            if (childNames.indexOf(child.props.name) !== -1 ) console.warn(`Duplicate name "${child.props.name}" found. Duplicate fields will be ignored`, child);
            childNames.push(child.props.name);

            return {
                ref: child.props.name,
                errors: child.props.errors || this.props.errors[child.props.name] || [],
                onChange: child.props.onChange || identity,
                onSubmit: child.props.onSubmit || identity
            };
        };

        return <div {...this.props}>
            {cloneChildren(clonePred, cloneProps, this.props.children)}
        </div>;
    }
});
