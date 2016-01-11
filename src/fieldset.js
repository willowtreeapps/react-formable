import React, { PropTypes } from 'react';
import cloneChildren, { createErrorsRule, createFormableRule } from './helpers/cloneChildren';
import values from './helpers/values';
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
        const errorsRule = createErrorsRule(this.props.errors, this.props.fieldErrors);
        const formableRule = createFormableRule(this.props);

        return <div {...this.props}>
            {cloneChildren([errorsRule, formableRule], this.props.children)}
        </div>;
    }
});
