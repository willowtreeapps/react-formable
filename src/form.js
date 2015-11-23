import React, { PropTypes } from 'react';
import map from 'lodash.map';
import values from 'lodash.values';
import isEqual from 'lodash.isequal';
import keys from './helpers/keys';
import mapObj from './helpers/mapObj';
import uniq from './helpers/uniq';
import isNil from './helpers/isNil';
import values from './helpers/values';
import flatten from './helpers/flatten';

export default React.createClass({
    propTypes: {
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        children: PropTypes.node
    },

    getDefaultProps() {
        return {
            onChange: function() {},
            onSubmit: function() {}
        };
    },

    serialize() {
        // We only care about things that can be serilized
        let refs = [];
        let refNameHash = {};
        let refNameHashErrors = {};
        for(let key in this.refs) {
            if (!this.refs[key].serialize) continue;

            refs[key] = this.refs[key];
            refNameHash[key] = undefined;
            refNameHashErrors = [];
        }

        // Set the initial form value
        let form = {
            valid: true,
            fieldValues: refNameHash,
            fieldErrors: refNameHashErrors,
            errors: []
        };

        let oldForm = form;
        let stable = false;
        let iteration = 0;
        const refLength = keys(refs).length;

        while (iteration < refLength && !stable) {
            // Keep a copy of the previous iteration of the form so we can
            // detect if the form is stable to exit early
            oldForm = Object.assign({}, form);

            // Get all the values of the form in no particular order
            form.fieldValues = mapObj(ref => ref.serialize(form.fieldValues), refs);

            // Get all the errors for the fields
            form.fieldErrors = mapObj((ref, name) => {
                const hasIsDisabled = ref.hasOwnProperty('isDisabled');

                let hasIsDisabledResult = hasIsDisabled && ref.isDisabled(
                    form.fieldValues[name],
                    form.fieldValues,
                    form.fieldErrors
                );

                if (hasIsDisabled && hasIsDisabledResult) { return []; }
                if (!hasIsDisabled && ref.props.disabled) { return []; }

                // We want to make validators as flexible as possible. We
                // will let the component add its own validators and set them
                // to state and allow the parent to supply them w/o the child
                // caring via props
                const stateValidators = (ref.state && ref.state.validators) || [];
                const propValidators = ref.props.validators || [];
                const validators = [].concat(stateValidators, propValidators);

                // Get all the error messages and remove nulls
                return validators
                        .map(validator => validator(form.fieldValues[name], form.fieldValues, form.fieldErrors))
                        .filter(x => x);
            }, refs);

            // Provide a flattened list of uniq errors for easy UI display
            form.errors = uniq(flatten(values(form.fieldErrors)))
                            .filter(x => !isNil(x));

            // Have a helper property to detect if the form is overall valid
            form.valid = !form.errors.length;

            // Set ourselves up for the next iteration
            // TODO: Evenatually we will need to check equality
            stable = false;
            iteration++;
        }

        return form;
    },

    onChange() {
    },

    onSubmit() {
    },

    cloneChildren(children) {
        if (typeof children !== 'object' || children === null) {
            return children;
        }

        return React.Children.map(children, function (child) {
            if (typeof child !== 'object' || child === null) {
                return child;
            }

            if (child.props && child.props.name) {
                return React.cloneElement(child, {
                    ref: child.props.name,
                    onChange: this.onChange,
                    onSubmit: this.onSubmit
                }, child.props && child.props.children);
            } else {
                return React.cloneElement(
                    child,
                    {},
                    this.cloneChildren(child.props && child.props.children)
                );
            }
        }, this);
    },

    render() {
        return <div {...this.props}
                    ref="form"
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    onKeyDown={this.onKeyDown}
                    noValidate={true}>
            {this.cloneChildren(this.props.children)}
        </div>;
    }
});
