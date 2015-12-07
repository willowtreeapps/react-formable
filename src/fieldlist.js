import React, { PropTypes } from 'react';
import cloneChildren from './helpers/cloneChildren';
import Form from './form';
import values from './helpers/values';
import Fieldset from './fieldset';

export default React.createClass({
    displayName: 'Fieldlist',

    getInputs() {
        return {
            ref: this,
            refs: values(this.refs.fieldset.getInputs().refs)
                    .filter(node => node.refs && values(node.refs).length)
        };
    },

    render() {
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
