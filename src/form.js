import React, { PropTypes } from 'react';
import uniq from './helpers/uniq';
import values from './helpers/values';
import cloneChildren, { createErrorsRule, createFormableRule } from './helpers/cloneChildren';
import tree from './helpers/tree';
import identity from './helpers/identity';

export const getBlankForm =function getBlankForm() {
    return {
        valid: true,
        fieldValues: {},
        fieldErrors: {},
        errors: []
    };
};

const treeValue = function treeValue(tree) {
    return tree.map(ref => ref.getValue && ref.getValue()).extract();
};

const getValidators = function getValidators(ref) {
    const propValidators = ref && ref.props && ref.props.validators || [];
    const refValidators = ref && ref.validators || [];

    return [].concat(propValidators, refValidators);
}

export default React.createClass({
    displayName: 'Form',

    propTypes: {
        addValidationFieldErrors: PropTypes.bool,

        // Handlers for your form callbacks. These will be called with the
        // current serialization of the form
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,

        showErrorsOnSubmit: PropTypes.bool,
        showErrorsOnChange: PropTypes.bool,

        validators: PropTypes.arrayOf(PropTypes.func),

        // Default React children prop
        children: PropTypes.node
    },

    getDefaultProps() {
        return {
            onChange: function () {},
            onSubmit: function () {},
            showErrorsOnSubmit: true,
            showErrorsOnChange: false
        };
    },

    getInitialState() {
        return {
            fieldErrors: {},
            errors: []
        };
    },

    serialize() {
        // Build our list of children
        const refs = values(this.refs || {})
                .filter(ref => (ref.getInputs || ref.getValue))
                .map(ref => ref.getInputs ? ref.getInputs() : { ref })
                .map(tree)
                .reduce((memo, node) => {
                    memo[node.ref.props.name] = node;
                    return memo;
                }, {});

        // Make our tree which we will use for serialization and validation
        const formTree = tree({ ref: this, refs });

        // Calculate how many times we should serialize in the case of
        // cycles when addValidationFieldErrors is true. We do this by
        // counting how many nodes are in our tree
        const refLength = formTree.map(() => 1).reduce((a,b) => a+b, 0);
        let iteration = 0;

        let form = getBlankForm();
        let oldForm = getBlankForm();

        do {
            // Keep a copy of the previous iteration of the form so we can
            // detect if the form is stable to exit early
            oldForm = Object.assign({}, form);

            // Gather our fieldValues from our tree
            form.fieldValues = treeValue(formTree);

            // Make a new temporary error tree. We will use this tree to
            // generate a nested object (fieldErrors) and again to reduce it
            // into an array (errors)
            const formTreeErrors = formTree
                .extend(tree => {
                    const validators = getValidators(tree.ref);
                    const value = tree.ref.getValue ? tree.ref.getValue() : treeValue(tree);
                    const fieldValues = form.fieldValues;
                    const fieldErrors = this.props.addValidationFieldErrors ? oldForm.fieldErrors : null;

                    return validators
                            .map(fn => fn(value, fieldValues, fieldErrors))
                            .filter(identity);
                });

            form.fieldErrors = formTreeErrors.extract()
            form.errors = formTreeErrors
                            .reduce((acc, val) => {
                                return acc.concat(val);
                            }, []);

            iteration++;

        // If we don't need fieldErrors in our validators, we only need to
        // execute this do..while once. We need to loop because we don't have
        // explicit dependencies. We fake dependencies by making
        // an eventually stable tree.
        } while(
            this.props.addValidationFieldErrors &&
            iteration < refLength &&
            JSON.stringify(form) !== JSON.stringify(oldForm)
        );

        // Update valid here so our formValidators can make use of it
        form.errors = uniq(form.errors.filter(identity));
        form.valid = !form.errors.length;

        return form;
    },

    onChange() {
        this.props.onChange(this.serialize());
        if (this.props.showErrorsOnChange) {
            this.showFieldErrors();
        }
    },

    onSubmit(event) {
        event && event.preventDefault && event.preventDefault()
        if (this.props.showErrorsOnSubmit) {
            this.showFieldErrors();
        }
        this.props.onSubmit(this.serialize());
    },

    onKeyDown(event) {
        if (event.key === 'Enter') {
            this.onSubmit(event);
        }
    },

    showFieldErrors() {
        const { fieldErrors, errors } = this.serialize();

        this.setState({ errors, fieldErrors });
        return errors;
    },

    clearFieldErrors() {
        this.setState({
            fieldErrors: {},
            errors: []
        });
    },

    render() {
        const errorsRule = createErrorsRule(this.state.errors, this.state.fieldErrors);
        const formableRule = createFormableRule(this.state.errors, this.state.fieldErrors, this.onSubmit, this.onChange);

        return <form {...this.props}
                    ref="form"
                    onSubmit={this.onSubmit}
                    onChange={function () {}}
                    onKeyDown={this.onKeyDown}>
            {cloneChildren([errorsRule, formableRule], this.props.children)}
        </form>;
    }
});
