import React, { PropTypes } from 'react';
import cloneChildren from './helpers/cloneChildren';
import values from './helpers/values';
import identity from './helpers/identity';
import warning from 'warning';

export default React.createClass({
    displayName: 'Fieldset',

    propTypes: {
        errors: PropTypes.arrayOf(PropTypes.string),
        fieldErrors: PropTypes.object,
        name: PropTypes.string.isRequired,
        children: PropTypes.node
    },

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
        warning( this.props.name, `Fieldset found without a name prop. The children of this component will behave eratically` );

        const fieldErrors = this.props.fieldErrors || {};
        let childNames = [];

        const clonePred = child => child.props && child.props.name || child.type.displayName === 'Errors';
        const cloneProps = child => {
            if (child.type.displayName === 'Errors') {
                return {
                    errors: this.props.errors,
                    fieldErrors: this.props.fieldErrors || {}
                };
            }

            warning(!child.ref, `Attempting to attach ref "${child.ref}" to "${child.props.name}" will be bad for your health`);
            warning(childNames.indexOf(child.props.name) === -1, `Duplicate name "${child.props.name}" found. Duplicate fields will be ignored`);
            childNames = childNames.concat(child.props.name);

            return {
                ref: child.ref || child.props.name,
                errors: this.props.errors,
                fieldErrors: child.props.fieldErrors || fieldErrors[child.props.name],
                onChange: child.props.onChange || identity,
                onSubmit: child.props.onSubmit || identity
            };
        };

        return <div {...this.props}>
            {cloneChildren(clonePred, cloneProps, this.props.children)}
        </div>;
    }
});
