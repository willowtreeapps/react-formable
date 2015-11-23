import React, { PropTypes } from 'react';
import map from 'lodash.map';
import values from 'lodash.values';
import isEqual from 'lodash.isequal';


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
        console.log('===============');
        const _refs = this.refs;

        // Clean out the supplied refs. We only care about things that can
        // be serilized and are not themselves forms.
        let refs = {};
        let nestedFormsRefs = {};
        for(let key in _refs) {
            if (!_refs[key].serialize) continue;

            if (_refs[key].isForm) {
                nestedFormsRefs[key] = _refs[key];
            } else {
                refs[key] = _refs[key];
            }
        }

        // We want an object with all our refnames with undefined as values.
        // This way our validators have placeholders for data
        var refNameHash = map(() => undefined, refs);
        var refNameHashErrors = map(() => [], refNameHash);

        // Set the initial form value
        var form = {
            valid: true,
            fieldValues: refNameHash,
            fieldErrors: refNameHashErrors,
            errors: []
        };
        var oldForm = form;

        var stable = false;
        var iteration = 0;
        var refLength = Object.keys(refs).length + Object.keys(nestedFormsRefs).length;

        var mergeForm = function(formData, formRef) {
            var serializedForm = formRef.serialize();

            var fieldValues = Object.assign({}, formData.fieldValues, serializedForm.fieldValues);
            var fieldErrors = Object.assign({}, formData.fieldErrors, serializedForm.fieldErrors);
            var errors = [].concat.apply([], Object.values(fieldErrors))
                            .filter(x => x)
                            .reduce((items, item) => ~items.indexOf(item) ? items.concat(item) :items, []);

            var valid = !errors.length;

            return { fieldValues, fieldErrors, errors, valid };
        };

        while (iteration < refLength && !stable) {
            // Keep a copy of the previous iteration of the form so we can
            // detect if the form is stable to exit early
            oldForm = Object.assign({}, form);

            // Get all the values of the form in no particular order
            form.fieldValues = map(ref => ref.serialize(form.fieldValues), refs);

            // Get all the errors for the fields
            form.fieldErrors = map((ref, name) => {
                var hasIsDisabled = ref.hasOwnProperty('isDisabled');
                var hasIsDisabledResult = hasIsDisabled && ref.isDisabled(form.fieldValues[name], form.fieldValues, form.fieldErrors);

                if (hasIsDisabled && hasIsDisabledResult) { return []; }
                if (!hasIsDisabled && ref.props.disabled) { return []; }

                // We want to make validators as flexible as possible. We
                // will let the component add its own validators and set them
                // to state and allow the parent to supply them w/o the child
                // caring via props
                var stateValidators = (ref.state && ref.state.validators) || [];
                var propValidators = ref.props.validators || [];
                var validators = [].concat(stateValidators, propValidators);

                // Get all the error messages and remove nulls
                return validators
                        .map(validator => validator(form.fieldValues[name], form.fieldValues, form.fieldErrors))
                        .filter(val => val);
            }, refs);

            // Provide a flattened list of uniq errors for easy UI display
            form.errors = [];

            // Have a helper property to detect if the form is overall valid
            form.valid = !form.errors.length;

            form = values(nestedFormRefs).reduce(mergeForm, form);

            // Set ourselves up for the next iteration
            stable = isEqual(form, oldForm);
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
