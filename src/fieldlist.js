import React, { PropTypes } from 'react';
import values from './helpers/values';
import Fieldset from './fieldset';
import warning from 'warning';

export default React.createClass({
    displayName: 'Fieldlist',

    propTypes: {
        errors: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string.isRequired,
        children: PropTypes.node
    },

    getInputs() {
        return {
            ref: this,
            refs: values(this.refs.fieldset.getInputs().refs)
                    .filter(node => node.refs && values(node.refs).length)
        };
    },

    render() {
        warning(
            this.props.name,
            `Fieldlist found without a name prop. The children of this component will behave eratically`
        );

        const errors = this.props.errors || [];

        return <Fieldset {...this.props} ref="fieldset">
            {React.Children.map(this.props.children, (child, i) =>
                <Fieldset name={this.props.name+i} errors={errors[i]}>
                    {child}
                </Fieldset>
            )}
        </Fieldset>;
    }
});
