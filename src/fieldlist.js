import React, { PropTypes } from 'react';
import values from './helpers/values';
import Fieldset from './fieldset';
import warning from 'warning';

export default React.createClass({
    displayName: 'Fieldlist',

    propTypes: {
        errors: PropTypes.arrayOf(PropTypes.string),
        fieldErrors: PropTypes.arrayOf(PropTypes.object),
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
        warning(this.props.name, `Fieldlist found without a name prop. The children of this component will behave eratically`);

        const errors = this.props.errors || [];
        const fieldErrors = this.props.fieldErrors || [];

        // Overwrite errors and fieldErrors passed in here as fieldset expects
        // different errors than fieldlist. There is no need to pass them down
        return <Fieldset {...this.props}
                         ref="fieldset"
                         errors={[]}
                         fieldErrors={{}}>
            {React.Children.map(this.props.children, (child, i) =>
                <Fieldset name={this.props.name+i}
                          errors={errors}
                          fieldErrors={fieldErrors[i]}>
                    {child}
                </Fieldset>
            )}
        </Fieldset>;
    }
});
